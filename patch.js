const fs = require('fs');

const path = '/Users/juanquijandriamejia/Documents/Antigravity/cotizador-inmobiliario/index.html';
let content = fs.readFileSync(path, 'utf8');

const replacement1 = `            const addRow = () => {
                const id = ++pagosIdCounter;
                state.pagos.push({ id, type: 'normal', desc: 'SEPARACIÓN', monto: 0, fecha: today, indefinida: false });
                renderRows();
                updatePreview();
            };

            const renderRows = () => {
                container.innerHTML = '';
                state.pagos.forEach((pago) => {
                    if (!pago.type) pago.type = 'normal';
                    const row = document.createElement('div');
                    row.className = 'bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-brand-light/30 mb-3';

                    if (pago.type === 'normal' || (pago.type === 'cuota_block' && pago.desc !== 'CUOTA')) {
                        row.innerHTML = \`
                        <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-3 items-start">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Concepto</label>
                                <select class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none desc-input font-medium cursor-pointer" data-id="\${pago.id}">
                                    <option value="SEPARACIÓN" \${pago.desc === 'SEPARACIÓN' ? 'selected' : ''}>SEPARACIÓN</option>
                                    <option value="INICIAL" \${pago.desc === 'INICIAL' ? 'selected' : ''}>INICIAL</option>
                                    <option value="CUOTA" \${pago.desc === 'CUOTA' ? 'selected' : ''}>CUOTA</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Monto</label>
                                <input type="number" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none monto-input font-semibold" placeholder="0.00" value="\${pago.monto || ''}" data-id="\${pago.id}">
                            </div>
                            <div>
                                <div class="flex items-center justify-between mb-1.5">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fecha</label>
                                    <label class="flex items-center gap-1.5 cursor-pointer group">
                                        <input type="checkbox" class="indef-input w-3 h-3 text-brand-light rounded border-gray-300 focus:ring-brand-light cursor-pointer" data-id="\${pago.id}" \${pago.indefinida ? 'checked' : ''}>
                                        <span class="text-[10px] font-medium text-gray-500 group-hover:text-gray-800 transition-colors">Indefinida</span>
                                    </label>
                                </div>
                                <input type="date" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none fecha-input text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer" data-id="\${pago.id}" value="\${pago.fecha || today}" \${pago.indefinida ? 'disabled' : ''}>
                            </div>
                            <div class="pt-6">
                                <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors del-btn" data-id="\${pago.id}" title="Eliminar fila">
                                    <i class="ph-bold ph-trash"></i>
                                </button>
                            </div>
                        </div>
                        \`;
                    } else if (pago.type === 'cuota_block' && !pago.isGenerated) {
                        row.innerHTML = \`
                        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Concepto</label>
                                <select class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none desc-input font-medium cursor-pointer" data-id="\${pago.id}">
                                    <option value="SEPARACIÓN" \${pago.desc === 'SEPARACIÓN' ? 'selected' : ''}>SEPARACIÓN</option>
                                    <option value="INICIAL" \${pago.desc === 'INICIAL' ? 'selected' : ''}>INICIAL</option>
                                    <option value="CUOTA" \${pago.desc === 'CUOTA' ? 'selected' : ''}>CUOTA</option>
                                </select>
                            </div>
                            <div class="pt-6">
                                <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors del-btn" data-id="\${pago.id}" title="Eliminar fila">
                                    <i class="ph-bold ph-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-3 mt-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Monto a Financiar</label>
                                <input type="number" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none monto-financiar-input font-semibold" placeholder="0.00" value="\${pago.montoTotal || ''}" data-id="\${pago.id}">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">N° de Meses</label>
                                <input type="number" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none meses-input" placeholder="12" value="\${pago.meses || ''}" data-id="\${pago.id}">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Día de Pago</label>
                                <input type="number" min="1" max="31" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none dia-pago-input" placeholder="15" value="\${pago.diaPago || ''}" data-id="\${pago.id}">
                            </div>
                        </div>
                        <div class="mt-3">
                            <button type="button" class="w-full text-xs font-bold text-brand-light hover:text-white bg-brand-light/10 hover:bg-brand-light py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 generar-cuotas-btn" data-id="\${pago.id}">
                                <i class="ph-bold ph-calculator"></i> Generar Cuotas
                            </button>
                        </div>
                        \`;
                    } else if (pago.type === 'cuota_block' && pago.isGenerated) {
                        const moneda = document.querySelector('input[name="moneda"]:checked')?.value || 'S/';
                        row.innerHTML = \`
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-sm font-bold text-gray-900">\${pago.meses} Cuotas de \${moneda} \${formatMoney(pago.montoTotal / pago.meses)} los días \${pago.diaPago}</h4>
                                <p class="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Total: \${moneda} \${formatMoney(pago.montoTotal)}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-light hover:bg-brand-light/10 rounded-lg transition-colors edit-cuotas-btn" data-id="\${pago.id}" title="Editar">
                                    <i class="ph-bold ph-pencil-simple text-base"></i>
                                </button>
                                <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors del-btn" data-id="\${pago.id}" title="Eliminar bloque">
                                    <i class="ph-bold ph-trash text-base"></i>
                                </button>
                                <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors toggle-cuotas-btn" data-id="\${pago.id}" title="Ver cuotas">
                                    <i class="ph-bold ph-caret-down text-base transition-transform \${pago.isOpen ? 'rotate-180' : ''}"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="mt-3 space-y-1.5 \${pago.isOpen ? 'block' : 'hidden'} border-t border-gray-100 pt-3">
                            \${pago.cuotas.map(c => \`
                                <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-100">
                                    <span class="font-semibold text-gray-700">\${c.desc}</span>
                                    <span class="text-gray-500 font-medium">\${formatDate(c.fecha)}</span>
                                    <span class="font-bold text-brand-dark">\${moneda} \${formatMoney(c.monto)}</span>
                                </div>
                            \`).join('')}
                        </div>
                        \`;
                    }
                    container.appendChild(row);
                });

                attachRowEventListeners();
            };

            const attachRowEventListeners = () => {
                container.querySelectorAll('.desc-input').forEach(el => el.addEventListener('change', (e) => {
                    const pago = state.pagos.find(p => p.id == e.target.dataset.id);
                    pago.desc = e.target.value;
                    if (pago.desc === 'CUOTA') {
                        pago.type = 'cuota_block';
                        pago.montoTotal = pago.monto || 0;
                        pago.meses = 12;
                        pago.diaPago = 15;
                        pago.isGenerated = false;
                        pago.isOpen = false;
                        pago.cuotas = [];
                    } else {
                        pago.type = 'normal';
                        if (!pago.monto) pago.monto = 0;
                        if (!pago.fecha) pago.fecha = today;
                    }
                    renderRows();
                    updatePreview();
                }));
                
                container.querySelectorAll('.monto-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).monto = parseFloat(e.target.value) || 0;
                    updatePreview();
                }));
                
                container.querySelectorAll('.fecha-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).fecha = e.target.value;
                    updatePreview();
                }));
                
                container.querySelectorAll('.indef-input').forEach(el => el.addEventListener('change', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).indefinida = e.target.checked;
                    renderRows();
                    updatePreview();
                }));
                
                container.querySelectorAll('.del-btn').forEach(el => el.addEventListener('click', (e) => {
                    const id = e.currentTarget.dataset.id;
                    state.pagos = state.pagos.filter(p => p.id != id);
                    renderRows();
                    updatePreview();
                }));

                // CUOTAS SPECIFIC
                container.querySelectorAll('.monto-financiar-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).montoTotal = parseFloat(e.target.value) || 0;
                }));
                
                container.querySelectorAll('.meses-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).meses = parseInt(e.target.value, 10) || 0;
                }));
                
                container.querySelectorAll('.dia-pago-input').forEach(el => el.addEventListener('input', (e) => {
                    let val = parseInt(e.target.value, 10) || 1;
                    if (val < 1) val = 1;
                    if (val > 31) val = 31;
                    state.pagos.find(p => p.id == e.target.dataset.id).diaPago = val;
                }));
                
                container.querySelectorAll('.generar-cuotas-btn').forEach(el => el.addEventListener('click', (e) => {
                    const pago = state.pagos.find(p => p.id == e.currentTarget.dataset.id);
                    if (!pago.montoTotal || pago.montoTotal <= 0) return alert('Ingrese un monto válido');
                    if (!pago.meses || pago.meses <= 0) return alert('Ingrese un número de meses válido');
                    
                    pago.isGenerated = true;
                    pago.isOpen = true; // open accordion by default
                    pago.cuotas = [];
                    
                    const montoPorCuota = pago.montoTotal / pago.meses;
                    
                    const todayDate = new Date();
                    let currentYear = todayDate.getFullYear();
                    let currentMonth = todayDate.getMonth() + 1; // 1-12
                    
                    for (let i = 1; i <= pago.meses; i++) {
                        let calcMonth = currentMonth + i;
                        let calcYear = currentYear;
                        while (calcMonth > 12) {
                            calcMonth -= 12;
                            calcYear += 1;
                        }
                        
                        let calcDay = pago.diaPago;
                        let maxDaysInMonth = new Date(calcYear, calcMonth, 0).getDate();
                        if (calcDay > maxDaysInMonth) calcDay = maxDaysInMonth;
                        
                        const calcDateStr = \`\${calcYear}-\${String(calcMonth).padStart(2, '0')}-\${String(calcDay).padStart(2, '0')}\`;
                        
                        pago.cuotas.push({
                            id: \`\${pago.id}-\${i}\`,
                            desc: \`Cuota \${i}\`,
                            monto: montoPorCuota,
                            fecha: calcDateStr
                        });
                    }
                    
                    renderRows();
                    updatePreview();
                }));
                
                container.querySelectorAll('.edit-cuotas-btn').forEach(el => el.addEventListener('click', (e) => {
                    const pago = state.pagos.find(p => p.id == e.currentTarget.dataset.id);
                    pago.isGenerated = false;
                    renderRows();
                    updatePreview();
                }));
                
                container.querySelectorAll('.toggle-cuotas-btn').forEach(el => el.addEventListener('click', (e) => {
                    const pago = state.pagos.find(p => p.id == e.currentTarget.dataset.id);
                    pago.isOpen = !pago.isOpen;
                    renderRows();
                }));
            };`;

const target1 = `            const addRow = () => {
                const id = ++pagosIdCounter;
                state.pagos.push({ id, desc: 'SEPARACIÓN', monto: 0, fecha: today, indefinida: false });
                renderRows();
                updatePreview();
            };

            const renderRows = () => {
                container.innerHTML = '';
                state.pagos.forEach((pago) => {
                    const row = document.createElement('div');
                    row.className = 'grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-3 items-start bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-brand-light/30';

                    row.innerHTML = \`
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Concepto</label>
                    <select class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none desc-input font-medium cursor-pointer" data-id="\${pago.id}">
                        <option value="SEPARACIÓN" \${pago.desc === 'SEPARACIÓN' ? 'selected' : ''}>SEPARACIÓN</option>
                        <option value="INICIAL" \${pago.desc === 'INICIAL' ? 'selected' : ''}>INICIAL</option>
                        <option value="CUOTA" \${pago.desc === 'CUOTA' ? 'selected' : ''}>CUOTA</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Monto</label>
                    <input type="number" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none monto-input font-semibold" placeholder="0.00" value="\${pago.monto || ''}" data-id="\${pago.id}">
                </div>
                <div>
                    <div class="flex items-center justify-between mb-1.5">
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fecha</label>
                        <label class="flex items-center gap-1.5 cursor-pointer group">
                            <input type="checkbox" class="indef-input w-3 h-3 text-brand-light rounded border-gray-300 focus:ring-brand-light cursor-pointer" data-id="\${pago.id}" \${pago.indefinida ? 'checked' : ''}>
                            <span class="text-[10px] font-medium text-gray-500 group-hover:text-gray-800 transition-colors">Indefinida</span>
                        </label>
                    </div>
                    <input type="date" class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-light/50 outline-none fecha-input text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer" data-id="\${pago.id}" value="\${pago.fecha}" \${pago.indefinida ? 'disabled' : ''}>
                </div>
                <div class="pt-6">
                    <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors del-btn" data-id="\${pago.id}" title="Eliminar fila">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </div>
            \`;
                    container.appendChild(row);
                });

                // Event Listeners for Dynamic Row Inputs
                container.querySelectorAll('.desc-input').forEach(el => el.addEventListener('change', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).desc = e.target.value;
                    updatePreview();
                }));
                container.querySelectorAll('.monto-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).monto = parseFloat(e.target.value) || 0;
                    updatePreview();
                }));
                container.querySelectorAll('.fecha-input').forEach(el => el.addEventListener('input', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).fecha = e.target.value;
                    updatePreview();
                }));
                container.querySelectorAll('.indef-input').forEach(el => el.addEventListener('change', (e) => {
                    state.pagos.find(p => p.id == e.target.dataset.id).indefinida = e.target.checked;
                    renderRows();
                    updatePreview();
                }));
                container.querySelectorAll('.del-btn').forEach(el => el.addEventListener('click', (e) => {
                    state.pagos = state.pagos.filter(p => p.id != e.currentTarget.dataset.id);
                    renderRows();
                    updatePreview();
                }));
            };`;

const target2 = \`            document.querySelectorAll('input[name="moneda"]').forEach(el => {
                el.addEventListener('change', updatePreview);
            });\`;
const replacement2 = \`            document.querySelectorAll('input[name="moneda"]').forEach(el => {
                el.addEventListener('change', () => {
                    renderRows();
                    updatePreview();
                });
            });\`;

const target3 = \`                // Update dynamic table in preview
                const tbody = document.getElementById('prevPagosTable');
                tbody.innerHTML = '';
                let total = 0;

                state.pagos.forEach(pago => {
                    const tr = document.createElement('tr');

                    const displayFecha = pago.indefinida ? 'Fecha Indefinida' : formatDate(pago.fecha) || '-';
                    const displayMonto = formatMoney(pago.monto);

                    tr.innerHTML = \\\`
                <td class="py-3 px-2 text-sm font-semibold text-gray-800">\${pago.desc}</td>
                <td class="py-3 px-2 text-sm text-gray-500 font-medium">\${displayFecha}</td>
                <td class="py-3 px-2 text-sm text-right font-bold text-gray-900">\${displayMonto}</td>
            \\\`;
                    tbody.appendChild(tr);
                    total += pago.monto;
                });\`;

const replacement3 = \`                // Update dynamic table in preview
                const tbody = document.getElementById('prevPagosTable');
                tbody.innerHTML = '';
                let total = 0;

                state.pagos.forEach(pago => {
                    if (pago.type === 'cuota_block' && pago.isGenerated) {
                        pago.cuotas.forEach(cuota => {
                            const tr = document.createElement('tr');
                            const displayFecha = formatDate(cuota.fecha);
                            const displayMonto = formatMoney(cuota.monto);
                            tr.innerHTML = \\\`
                                <td class="py-3 px-2 text-sm font-semibold text-gray-800">\${cuota.desc}</td>
                                <td class="py-3 px-2 text-sm text-gray-500 font-medium">\${displayFecha}</td>
                                <td class="py-3 px-2 text-sm text-right font-bold text-gray-900">\${displayMonto}</td>
                            \\\`;
                            tbody.appendChild(tr);
                            total += cuota.monto;
                        });
                    } else if (pago.type === 'normal' || !pago.type) {
                        const tr = document.createElement('tr');
                        const displayFecha = pago.indefinida ? 'Fecha Indefinida' : formatDate(pago.fecha) || '-';
                        const displayMonto = formatMoney(pago.monto || 0);

                        tr.innerHTML = \\\`
                            <td class="py-3 px-2 text-sm font-semibold text-gray-800">\${pago.desc}</td>
                            <td class="py-3 px-2 text-sm text-gray-500 font-medium">\${displayFecha}</td>
                            <td class="py-3 px-2 text-sm text-right font-bold text-gray-900">\${displayMonto}</td>
                        \\\`;
                        tbody.appendChild(tr);
                        total += (pago.monto || 0);
                    }
                });\`;

const target4 = \`                const opt = {
                    margin: 0,
                    filename: \\\`Cotizacion_\${clienteName}.pdf\\\`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                const btn = document.getElementById('btnPdf');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="ph-bold ph-spinner animate-spin text-xl"></i> Generando...';
                btn.classList.add('opacity-80', 'cursor-not-allowed');

                html2pdf().set(opt).from(element).save().then(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('opacity-80', 'cursor-not-allowed');
                });\`;

const replacement4 = \`                const opt = {
                    margin: 0,
                    filename: \\\`Cotizacion_\${clienteName}.pdf\\\`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                const btn = document.getElementById('btnPdf');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="ph-bold ph-spinner animate-spin text-xl"></i> Generando...';
                btn.classList.add('opacity-80', 'cursor-not-allowed');

                html2pdf().set(opt).from(element).save().then(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('opacity-80', 'cursor-not-allowed');
                }).catch((error) => {
                    console.error("Error generating PDF", error);
                    btn.innerHTML = originalText;
                    btn.classList.remove('opacity-80', 'cursor-not-allowed');
                });\`;

const target5 = \`                const moneda = document.querySelector('input[name="moneda"]:checked').value;
                const total = state.pagos.reduce((sum, p) => sum + p.monto, 0);\`;

const replacement5 = \`                const moneda = document.querySelector('input[name="moneda"]:checked').value;
                const total = state.pagos.reduce((sum, p) => {
                    if (p.type === 'cuota_block' && p.isGenerated) {
                        return sum + p.cuotas.reduce((cSum, c) => cSum + c.monto, 0);
                    }
                    if (p.type === 'normal' || !p.type) {
                        return sum + (p.monto || 0);
                    }
                    return sum;
                }, 0);\`;

const target6 = \`                state.pagos.forEach(p => {
                    data.push([
                        { v: p.desc, s: tableCellStyle },
                        { v: p.indefinida ? 'Indefinida' : p.fecha, s: { ...tableCellStyle, alignment: { horizontal: "center" } } },
                        { v: p.monto, t: "n", s: tableMoneyStyle }
                    ]);
                });\`;

const replacement6 = \`                state.pagos.forEach(p => {
                    if (p.type === 'cuota_block' && p.isGenerated) {
                        p.cuotas.forEach(cuota => {
                            data.push([
                                { v: cuota.desc, s: tableCellStyle },
                                { v: cuota.fecha, s: { ...tableCellStyle, alignment: { horizontal: "center" } } },
                                { v: cuota.monto, t: "n", s: tableMoneyStyle }
                            ]);
                        });
                    } else if (p.type === 'normal' || !p.type) {
                        data.push([
                            { v: p.desc, s: tableCellStyle },
                            { v: p.indefinida ? 'Indefinida' : p.fecha, s: { ...tableCellStyle, alignment: { horizontal: "center" } } },
                            { v: p.monto, t: "n", s: tableMoneyStyle }
                        ]);
                    }
                });\`;

const target7 = \`                const area = document.getElementById('area').value || '-';
                const moneda = document.querySelector('input[name="moneda"]:checked').value;
                const total = formatMoney(state.pagos.reduce((sum, p) => sum + p.monto, 0));

                let text = \\\`Hola *\\\${cliente}* 👋,\\n\\nTe adjunto el resumen de la cotización del inmueble de tu interés:\\n\\n\\\`;
                text += \\\`📍 *Ubicación:* Etapa \\\${etapa}, Mz \\\${mz}, Lote \\\${lote}\\n\\\`;
                text += \\\`📏 *Área:* \\\${area} m²\\n\\n\\\`;
                text += \\\`💰 *Plan de Inversión (Total: \\\${moneda} \\\${total}):*\\n\\\`;

                state.pagos.forEach(p => {
                    const fechaStr = p.indefinida ? 'Fecha Indefinida' : formatDate(p.fecha);
                    text += \\\`• \\\${p.desc}: \\\${moneda} \\\${formatMoney(p.monto)} (\\\${fechaStr})\\n\\\`;
                });\`;

const replacement7 = \`                const area = document.getElementById('area').value || '-';
                const moneda = document.querySelector('input[name="moneda"]:checked').value;
                const totalValue = state.pagos.reduce((sum, p) => {
                    if (p.type === 'cuota_block' && p.isGenerated) {
                        return sum + p.cuotas.reduce((cSum, c) => cSum + c.monto, 0);
                    }
                    if (p.type === 'normal' || !p.type) {
                        return sum + (p.monto || 0);
                    }
                    return sum;
                }, 0);
                const total = formatMoney(totalValue);

                let text = \\\`Hola *\\\${cliente}* 👋,\\n\\nTe adjunto el resumen de la cotización del inmueble de tu interés:\\n\\n\\\`;
                text += \\\`📍 *Ubicación:* Etapa \\\${etapa}, Mz \\\${mz}, Lote \\\${lote}\\n\\\`;
                text += \\\`📏 *Área:* \\\${area} m²\\n\\n\\\`;
                text += \\\`💰 *Plan de Inversión (Total: \\\${moneda} \\\${total}):*\\n\\\`;

                state.pagos.forEach(p => {
                    if (p.type === 'cuota_block' && p.isGenerated) {
                        p.cuotas.forEach(cuota => {
                            text += \\\`• \\\${cuota.desc}: \\\${moneda} \\\${formatMoney(cuota.monto)} (\\\${formatDate(cuota.fecha)})\\n\\\`;
                        });
                    } else if (p.type === 'normal' || !p.type) {
                        const fechaStr = p.indefinida ? 'Fecha Indefinida' : formatDate(p.fecha);
                        text += \\\`• \\\${p.desc}: \\\${moneda} \\\${formatMoney(p.monto)} (\\\${fechaStr})\\n\\\`;
                    }
                });\`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
content = content.replace(target3, replacement3);
content = content.replace(target4, replacement4);
content = content.replace(target5, replacement5);
content = content.replace(target6, replacement6);
content = content.replace(target7, replacement7);

fs.writeFileSync(path, content);
console.log("Patched successfully!");
