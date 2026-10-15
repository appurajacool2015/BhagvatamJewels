import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Check, RefreshCw, AlertCircle, Package, Download, Table } from 'lucide-react';
import { DISCOVERY_CATEGORIES, OUTFIT_COLORS } from '../data/jewelry';

export default function AdminProductManager({ isOpen, onClose, products, onUpdateProducts, onResetDefaults }) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'add'
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editSubType, setEditSubType] = useState('');

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Necklaces');
  const [newSubType, setNewSubType] = useState('Chokers');
  const [newPrice, setNewPrice] = useState('');
  const [newMrp, setNewMrp] = useState('');
  const [newStock, setNewStock] = useState('15');
  const [newOutfitMatches, setNewOutfitMatches] = useState(['Yellow', 'Red']);
  const [newModelImage, setNewModelImage] = useState('https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1000&q=85');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85');
  const [newDesc, setNewDesc] = useState('');

  if (!isOpen) return null;

  // Toggle inStock
  const handleToggleStock = (id) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const nextInStock = !p.inStock;
        return {
          ...p,
          inStock: nextInStock,
          stockQuantity: nextInStock ? (p.stockQuantity > 0 ? p.stockQuantity : 10) : 0
        };
      }
      return p;
    });
    onUpdateProducts(updated);
  };

  // Start inline editing
  const handleStartEdit = (p) => {
    setEditingId(p.id);
    setEditPrice(p.price.toString());
    setEditStock((p.stockQuantity || 0).toString());
    setEditSubType(p.subCategory || '');
  };

  // Save inline edit
  const handleSaveEdit = (id) => {
    const priceNum = parseInt(editPrice, 10);
    const stockNum = parseInt(editStock, 10);
    if (isNaN(priceNum) || priceNum <= 0) return;

    const updated = products.map((p) => {
      if (p.id === id) {
        const isAvailable = stockNum > 0;
        const discountPct = p.mrp > priceNum ? Math.round(((p.mrp - priceNum) / p.mrp) * 100) : 0;
        return {
          ...p,
          price: priceNum,
          stockQuantity: stockNum,
          subCategory: editSubType || p.subCategory,
          inStock: isAvailable,
          discount: `${discountPct}% OFF`
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    setEditingId(null);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this piece from your inventory?')) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
    }
  };

  // Toggle outfit match in new form
  const handleToggleOutfitChoice = (colorId) => {
    setNewOutfitMatches((prev) =>
      prev.includes(colorId) ? prev.filter(c => c !== colorId) : [...prev, colorId]
    );
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'SubCategory', 'Price', 'MRP', 'StockQty', 'InStock', 'OutfitMatch', 'ModelImage', 'ProductImage'];
    const rows = products.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.category,
      p.subCategory || '',
      p.price,
      p.mrp,
      p.stockQuantity || 0,
      p.inStock ? 'TRUE' : 'FALSE',
      `"${(p.outfitMatch || []).join(';')}"`,
      p.modelImage,
      p.productImage || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bhagvatam_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const priceNum = parseInt(newPrice, 10);
    const mrpNum = parseInt(newMrp, 10);
    const stockNum = parseInt(newStock, 10);

    if (!newTitle || isNaN(priceNum) || isNaN(mrpNum)) return;

    const discountPct = mrpNum > priceNum ? Math.round(((mrpNum - priceNum) / mrpNum) * 100) : 0;

    const newProd = {
      id: `bhag-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      subCategory: newSubType,
      style: 'Festive & Contemporary',
      mrp: mrpNum,
      price: priceNum,
      discount: `${discountPct}% OFF`,
      rating: 4.9,
      reviewsCount: 1,
      badge: 'New Launch',
      inStock: stockNum > 0,
      stockQuantity: stockNum,
      outfitMatch: newOutfitMatches.length > 0 ? newOutfitMatches : ['Yellow', 'Green'],
      material: '18k Micro Gold Plating & Brass',
      stones: 'Handcrafted Kundan / Meenakari',
      closure: 'Comfort Fit',
      productImage: newProductImage,
      modelImage: newModelImage,
      description: newDesc || `${newTitle} handcrafted with premium finish. Suitable for weddings, festivals, and celebrations.`,
      features: ['Anti-Tarnish Polish', 'Lead & Nickel Free', 'Cash on Delivery', '7-Day Easy Return']
    };

    onUpdateProducts([newProd, ...products]);
    setActiveTab('inventory');
    setNewTitle('');
    setNewPrice('');
    setNewMrp('');
    setNewDesc('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-obsidian-950/85 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-manager-title"
    >
      <div className="relative w-full max-w-5xl vault-glass-elevated rounded-2xl border border-gold-400/35 p-4 sm:p-8 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gold-400/20 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-gold-400" />
              <h3 id="admin-manager-title" className="text-lg sm:text-2xl font-serif text-alabaster-50 font-medium">
                Live Spreadsheet Inventory & Price Manager
              </h3>
            </div>
            <p className="text-xs text-alabaster-300 font-sans mt-0.5">
              Edit prices, adjust verified stock, and tag outfit matches in real time.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-alabaster-300 hover:text-gold-300 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label="Close inventory manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between py-3 border-b border-white/10 gap-2 shrink-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold-400 ${
                activeTab === 'inventory'
                  ? 'bg-gold-400 text-obsidian-950 font-bold shadow'
                  : 'bg-obsidian-850 text-alabaster-200 hover:text-white border border-white/5'
              }`}
              aria-pressed={activeTab === 'inventory'}
            >
              Inventory Sheet ({products.length} Items)
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-gold-400 ${
                activeTab === 'add'
                  ? 'bg-gold-400 text-obsidian-950 font-bold shadow'
                  : 'bg-obsidian-850 text-alabaster-200 hover:text-white border border-white/5'
              }`}
              aria-pressed={activeTab === 'add'}
            >
              <Plus className="w-4 h-4" />
              <span>Add New Piece</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleExportCSV}
              className="min-h-[44px] text-xs font-sans text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="Download your catalog as an Excel/CSV file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onResetDefaults}
              className="min-h-[44px] text-xs font-sans text-alabaster-400 hover:text-red-400 flex items-center gap-1.5 bg-obsidian-900 border border-white/10 px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
              title="Reset catalog back to initial state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SPREADSHEET TABLE VIEW */}
        {activeTab === 'inventory' && (
          <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs font-sans">
            <div className="text-[11px] text-gold-300/90 font-sans bg-gold-400/10 p-2.5 rounded-lg border border-gold-400/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-gold-400" />
              <span>
                Edit price or stock numbers inline. If stock is &le; 3, the card automatically shows a <strong>"🔥 Only X Left"</strong> badge on the website!
              </span>
            </div>

            <div className="overflow-x-auto border border-white/10 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-obsidian-950 text-alabaster-400 text-[10px] uppercase tracking-wider border-b border-white/10">
                    <th className="p-3">Piece</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Sub-Type</th>
                    <th className="p-3">Price (₹)</th>
                    <th className="p-3">Stock Qty</th>
                    <th className="p-3">Outfit Match</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => {
                    const isEditing = editingId === p.id;
                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        
                        {/* Title & Photo */}
                        <td className="p-3 flex items-center gap-2.5 min-w-[200px]">
                          <img
                            src={p.productImage || p.modelImage}
                            alt={p.title}
                            className="w-10 h-10 object-cover rounded-lg bg-obsidian-950 shrink-0"
                          />
                          <span className="font-medium text-alabaster-100 truncate">{p.title}</span>
                        </td>

                        {/* Category */}
                        <td className="p-3 text-alabaster-300 whitespace-nowrap">{p.category}</td>

                        {/* SubCategory */}
                        <td className="p-3 text-gold-300 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editSubType}
                              onChange={(e) => setEditSubType(e.target.value)}
                              className="w-24 bg-obsidian-950 border border-gold-400 rounded px-2 py-1 text-xs text-gold-300"
                            />
                          ) : (
                            p.subCategory || 'General'
                          )}
                        </td>

                        {/* Price */}
                        <td className="p-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-20 bg-obsidian-950 border border-gold-400 rounded px-2 py-1 text-xs text-gold-300 font-bold"
                            />
                          ) : (
                            <span className="font-bold text-gold-300">₹{p.price}</span>
                          )}
                        </td>

                        {/* Stock Qty */}
                        <td className="p-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              className="w-16 bg-obsidian-950 border border-gold-400 rounded px-2 py-1 text-xs text-alabaster-100"
                            />
                          ) : (
                            <span className={p.stockQuantity <= 3 && p.stockQuantity > 0 ? 'text-amber-400 font-bold' : ''}>
                              {p.stockQuantity || 0} units
                            </span>
                          )}
                        </td>

                        {/* Outfit Match */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex gap-1">
                            {(p.outfitMatch || ['All']).map(c => (
                              <span key={c} className="bg-obsidian-850 px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-alabaster-300">
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Stock Status Toggle */}
                        <td className="p-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                              p.inStock
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-right whitespace-nowrap">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveEdit(p.id)}
                              className="p-1 rounded bg-emerald-500 text-obsidian-950 hover:bg-emerald-400 font-bold px-2 py-0.5 text-xs"
                            >
                              Save
                            </button>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-1.5 rounded text-alabaster-400 hover:text-gold-300"
                                title="Edit"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 rounded text-alabaster-500 hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ADD PRODUCT WITH 3D FIELDS */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddProduct} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Product Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Royal Meenakari Temple Jhumkas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Main Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="Necklaces">Necklaces</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bangles & Kadas">Bangles & Kadas</option>
                  <option value="Rings & Accessories">Rings & Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Sub-Type</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jhumkas, Broad Kada, Choker"
                  value={newSubType}
                  onChange={(e) => setNewSubType(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Selling Price (₹)</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 599"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-gold-300 font-bold focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Original MRP (₹)</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 1499"
                  value={newMrp}
                  onChange={(e) => setNewMrp(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Initial Stock Quantity</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 15"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Outfit Match Checkbox Chips */}
            <div>
              <label className="block text-alabaster-300 mb-1.5 font-medium">
                Which Outfit / Dress Colors Does This Match? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {['Yellow', 'Green', 'Pink', 'Red', 'Black'].map((c) => {
                  const isChecked = newOutfitMatches.includes(c);
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => handleToggleOutfitChoice(c)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        isChecked
                          ? 'border-gold-400 bg-gold-400/20 text-gold-200 font-bold'
                          : 'border-white/10 bg-obsidian-850 text-alabaster-400'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}{c} Dress
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Model Wearing Photo URL</label>
                <input
                  type="url"
                  value={newModelImage}
                  onChange={(e) => setNewModelImage(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400 text-[11px]"
                />
              </div>

              <div>
                <label className="block text-alabaster-300 mb-1 font-medium">Product Close-Up Photo URL</label>
                <input
                  type="url"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400 text-[11px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:shadow-gold-glow transition-all shadow-xl"
            >
              Publish to Storefront
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
