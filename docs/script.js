document.addEventListener('DOMContentLoaded', () => {
    // Preisstruktur
    const priceConfig = {
        'Bremsen': {
            prices: [210000, 270000, 240000, 0],
            selector: '#bremsen'
        },
        'Federung': {
            prices: [210000, 270000, 240000, 0],
            selector: '#federung'

        },
        'Getriebe': {
            prices: [270000, 420000, 300000, 0],
            selector: '#getriebe'
        },
        'Motor': {
            prices: [300000, 480000, 300000, 0],
            selector: '#motor'
        },
        'Turbo': {
            prices: [300000, 450000, 240000, 1000000],
            selector: '#turbo'
        },
        'Fulltune': {
            prices: [1000000, 1500000, 800000, 1200000],
            selector: '#fulltune'
        },
        'Panzerung': {
            prices: [300000, 500000, 240000, 600000],
            selector: '#panzerung'
        },
        'Fenstertönung': {
            prices: [50000, 60000, 35000, 150000],
            selector: '#fenstertoenung'
        },
        'Sticker': {
            prices: [50000, 100000, 40000, 250000],
            selector: '#sticker'
        },
        'Hupen': {
            prices: [35000, 50000, 35000, 0],
            selector: '#hupe'
        },
        'Interieur': {
            prices: [80000, 100000, 40000, 0],
            selector: '#interieur'
        },
        'Primärfarbe': {
            prices: [75000, 100000, 60000, 500000],
            selector: '#primaerfarbe'
        },
        'Sekundärfarbe': {
            prices: [60000, 80000, 35000, 350000],
            selector: '#sekundaerfarbe'
        },
        'Perleffekt': {
            prices: [45000, 60000, 30000, 250000],
            selector: '#perleffekt'
        },
        'Nummernschildfarbe': {
            prices: [40000, 45000, 35000, 0],
            selector: '#nummernschild'
        },
        'Custom-Kennzeichen': {
            prices: [3000000, 3000000, 3000000, 3000000],
            selector: '#customkennzeichen'
        },
        'Reifenfarbe': {
            prices: [35000, 45000, 40000, 220000],
            selector: '#reifenfarbe'
        },
        'Reifenqualm': {
            prices: [30000, 35000, 30000, 0],
            selector: '#reifenqualm'
        },
        'Xenon Scheinwerfer': {
            prices: [50000, 50000, 50000, 180000],
            selector: '#xenon'
        },
        'Unterboden': {
            prices: [35000, 50000, 38000, 180000],
            selector: '#unterboden'
        },
        'Quarterdeck': {
            prices: [30000, 30000, 27000, 0],
            selector: '#quarterdeck'
        },
        'fastrepairkits': {
            prices: [120000, 120000, 120000, 120000],
            selector: '#fastrepairkits'
            isQuantity: true
        },
        'felgen': {
            prices: [
                [0, 0, 0, 0],
                [50000, 50000, 50000, 50000],
                [100000, 100000, 100000, 100000]
            ],
            selector: '#felgen',
            isDropdown: true
        },
        'headlights': {
            prices: [
                [0, 0, 0, 0],
                [1000000, 1000000, 1000000, 1000000],
                [500000, 500000, 500000, 500000]
            ],
            selector: '#headlights',
            isDropdown: true
        },
        'Fahrzeugteile': {
            prices: [60000, 75000, 50000, 80000], // Preise pro Stück
            selector: '#fahrzeugteile-anzahl'
        }
    };

    const anzahlElement = document.getElementById('fahrzeugteile-anzahl');
    const plusBtn = document.getElementById('fahrzeugteile-plus');
    const minusBtn = document.getElementById('fahrzeugteile-minus');

    let anzahl = 0;

    function updateCounter() {
        anzahlElement.textContent = anzahl;
        minusBtn.disabled = anzahl === 0;
        updatePrice();
    }

    plusBtn.addEventListener('click', () => {
        anzahl++;
        updateCounter();
    });

    minusBtn.addEventListener('click', () => {
        if (anzahl > 0) anzahl--;
        updateCounter();
    });

    // Gutschein-Regeln – beide Gutscheine sollen exakt gleich behandelt werden
    const voucherRules = {
        'gutschein1': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        },
        'gutschein2': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        }
    };

    const zuordnungSelectElement = document.getElementById('zuordnungSelect');
    if (zuordnungSelectElement) {
        const infoBox = document.getElementById('zuordnungInfo');
        const optionInfo = {
            'lsc': 'Primär: #ff4400 <br> Sekundär: - <br> Perleffekt: 7. Reihe das vierte <br> Reifenqualm: Orange <br> Unterboden: Orange',
            'fib vip': 'Ihr nehmt kein Ausweis von FIBlern <br> Codewort: Brille <br> Info: Die Ränge Recruit, Trainee und Junior Agent tunen Dienstfahrzeuge kostenlos',
            'md vip': 'Primär: #ffffff <br> Sekundär: - <br> Perlerffekt: Nichts (Schwarz) <br> Keine Troll Felgen und keine Fenstertönung <br> Info: Die Ränge Praktikant, Sanitäter, Allg. Mediziner und Feld-Sanitäter tunen Dienstfahrzeuge kostenlos',
            'md tmf vip': 'Primär: Shell (Braun) <br> Sekundär: - <br> Perlerffekt: Nichts (Schwarz) <br> Info: Die Ränge Praktikant, Sanitäter, Allg. Mediziner und Feld-Sanitäter tunen Dienstfahrzeuge kostenlos',
            'md tmf unmarked vip': 'Primär: Hell Braun <br> Sekundär: - <br> Perlerffekt: Nichts (Schwarz) <br> Info: NUR dem Einsatzleiter/in dies bezüglich tunen!',
            'pd vip': 'Primärfarbe: Aluminium (grau) <br> Sekundärfarbe: - <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'army vip': 'Primärfarbe: Jagd Grün <br> Sekundärfarbe: - <br> Perleffekt: Army Grün <br> Info: Die Ränge Private, Private First Class, Specialist, Coporal und Seargent tunen Dienstfahrzeuge kostenlos <br> Kennzeichen für Dienstautos sind immer kostenlos!',
            'army unmarked vip': 'Primärfarbe: Diamantblau <br> Sekundärfarbe: Alabasta Weiß <br> Perleffekt: Kaugummiblau <br> Info: Die Ränge Private, Private First Class, Specialist, Coporal und Seargent tunen Dienstfahrzeuge kostenlos <br> Kennzeichen für Dienstautos sind immer kostenlos!',
            'army navyseals vip': 'Primärfarbe: Verbotenes Blau <br> Sekundärfarbe: Verbotenes Blau <br> Perleffekt: Himmelblau <br> Info: Die Ränge Private, Private First Class, Specialist, Coporal und Seargent tunen Dienstfahrzeuge kostenlos <br> Kennzeichen für Dienstautos sind immer kostenlos!',
            'army einsatzleitung vip': 'Primärfarbe: Sand (Braun) <br> Sekundärfarbe:  <br> Perleffekt: Helles Gold <br> Info: Die Ränge Private, Private First Class, Specialist, Coporal und Seargent tunen Dienstfahrzeuge kostenlos <br> Kennzeichen für Dienstautos sind immer kostenlos!',
            'army taskforce vip': 'Primärfarbe: #6d6e6d <br> Sekundärfarbe: Titanium Grau  <br> Perleffekt: Titanium Grau <br> Info: Die Ränge Private, Private First Class, Specialist, Coporal und Seargent tunen Dienstfahrzeuge kostenlos <br> Kennzeichen für Dienstautos sind immer kostenlos!',
            'ice company vip': 'Primärfarbe: Diamantblau <br> Sekundärfarbe: Kaugummi Blau <br> Perleffekt: Alabaster weiß <br> Reifenqualm: ./.',
            'onepiece vip': 'Primärfarbe: #aeb6bf <br> Sekundärfarbe: #aeb6bf <br> Perleffekt: 7. Reihe, das vierte (Helles Gold) <br> Reifenqualm: ./.',
            'onepieceug vip': 'Primärfarbe: Mattschwarz <br> Sekundärfarbe: / <br> Perleffekt: Helles Gold',
            'unicorn vip': 'Primärfarbe: Matt Grau <br> Sekundärfarbe: / <br> Perleffekt: Bonbon Rot',
            'sacra corona unita vip': 'Primärfarbe: Matt Schwarz <br> Sekundärfarbe: Matt Schwarz <br> Perleffekt: Metallic Lila <br> Unterboden: Weiß',
            'sacra corona unita ug vip': 'Primärfarbe: Weinrot <br> Sekundärfarbe: Weinrot <br> Perleffekt: Metallic Lila',
            'pink venom vip': 'Primärfarbe: Zuckerpflaume (Pink) <br> Sekundärfarbe: - <br> Perleffekt: Alabaster Weiß',
            'pd cid vip': 'Primärfarbe: Mitternachtsblau <br> Sekundärfarbe: --- <br> Perleffekt: Stahlguss(Schwarz) <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd gtf vip': 'Primärfarbe: Schwarz <br> Sekundärfarbe: Schwarz <br> Perleffekt: Schwarz <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'pd jugular vip': 'Primärfarbe: Amethyst (Lila) <br> Sekundärfarbe: ./. <br> Perleffekt: Diamantenblau mit Sticker: Fukaru <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd jugulargtf vip': 'Primärfarbe: Amethyst (Lila) <br> Sekundärfarbe: ./. <br> Perleffekt: Diamantenblau mit Sticker: Terroil <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd s.p.f.u vip': 'Primärfarbe: Carbon (Schwarz) <br> Sekundärfarbe: Carbon (Schwarz) <br> Perleffekt: Alabaster Weiß <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'pd swat vip': 'Primärfarbe: Nickel (grau) <br> Sekundärfarbe: ./. <br> Perleffekt: Alabaster Weiß mit Sticker: PD <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos',
            'pd unmarked vip': 'Primärfarbe: Schwarz <br> Sekundärfarbe: / <br> Perleffekt: Beige (Weiß) <br> Info: Die Ränge Praktikant, Rekrut, Junior Officer und Officer 1 tunen Dienstfahrzeuge kostenlos', 
            'hamadys vip': 'Primärfarbe: Matt orange <br> Sekundärfarbe: / <br> Perleffekt: carbon schwarz <br>',
            'lcn vip': 'Primär: Dunkles Silber <br> Sekundär: - <br> Perleffekt: Helles Gold',
            'los sombra vip': 'Primär: #797582 <br> Sekundär: #797582 <br> Perleffekt: Nichts (Schwarz)',
            'rosa la muerte': 'Primär: Cabernet rot <br> Sekundär: - <br> Perleffekt: Zellstoff rot' ,
            'rosa la muerte ug': 'Primär: Beton Grau <br> Sekundär: - <br> Perleffekt: Zellstoff rot' ,
            'lion de rue': 'Primär: Pastell Blau <br> Sekundär: - <br> Perleffekt: Elektrisches Rosa' ,
            'manfred schelle vip2': 'Bekommt auf all seine Fahrzeuge 40% Rabatt (wird automatisch abgezogen)',
            'grove street': 'Primär: Rasengrün <br> Sekundär: - <br> Perleffekt: Helles Gold',
            'grove street ug': 'Primär: Hellblau <br> Sekundär: Hellblau - <br> Perleffekt: Rasengrün',
            'vagos': 'Primär: Renn Gelb <br> Sekundär: Renn Gelb <br> Perleffekt: Alabasta Weiß',
            'aztecas': 'Primär: #31839e <br> Sekundär: - <br> Perleffekt: Diamant Blau',
            'midnight': 'Primär: Schnee Weiß <br> Sekundär: Schnee Weiß <br> Perleffekt: Helles Gold',
            'ballas': 'Primär: Metallic Lila <br> Sekundär: Metallic Lila <br> Perleffekt: Metallic Lila',
            'hellbainianze mc': 'Primär: Nickel Grau <br> Sekundär: - <br> Perleffekt: Orange',
            'los trinitarios': 'Primär: #836FFF <br> Sekundär: - <br> Perleffekt: Alabasta Weiß',
            'lcn': 'Primär: Dunkles Silber <br> Sekundär: - <br> Perleffekt: Helles Gold',
            'blue reign': 'Primär: #edfffd (Metall) <br> Sekundär: - <br> Perleffekt: Helles Blau ',
            'zivifuenf vip2': 'Zivis mit einer Visumstufe unter 5',
            'zivizehn vip3': 'Zivis mit einer Visumstufe zwischen 5-10',
            'zivilist': 'Normale Zivis mit Visumstufe über 10',
            'darkriders mc': 'Primär: Helles Gelb (Metall) <br> Sekundär: - <br> Perleffekt: Helles Gelb ',
            
            

            // Hier kannst du weitere Zuordnungen und Infos hinzufügen
        };

        function updateZuordnungInfo() {
            const selectedValue = zuordnungSelectElement.value.toLowerCase();
            if (optionInfo[selectedValue]) {
                infoBox.innerHTML = optionInfo[selectedValue];
                infoBox.style.display = 'block';
            } else {
                infoBox.style.display = 'none';
            }
        }

        // Bei Änderung des Dropdowns Info-Box aktualisieren und Preis neu berechnen
        zuordnungSelectElement.addEventListener('change', () => {
            updateZuordnungInfo();
            updatePrice();
        });

        // Initial beim Laden der Seite
        updateZuordnungInfo();
    }

    // DOM-Elemente
    const mainOptions = document.querySelectorAll('.main-option');
    const priceDisplay = document.getElementById('total-price');

    // Gutschein-Handler: beide Voucher-Dropdowns werden hier verarbeitet
    function handleVoucherChanges() {
        const voucherSelects = [
            document.getElementById('gutschein1'),
            document.getElementById('gutschein2')
        ];
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        
        // Rücksetzen aller Elemente, die von beiden Gutscheinen beeinflusst werden
        Object.values(voucherRules.gutschein1).forEach(rule => {
            rule.disable.elements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.disabled = false;
                    if (element.type === 'checkbox') {
                        element.checked = element.checked && !element.disabled;
                    }
                }
            });
        });
        
        // Verarbeitung beider Voucher-Felder
        voucherSelects.forEach((voucherSelect, index) => {
            if (!voucherSelect) return;
            const selectedOption = voucherSelect.value;
            // Überspringen, falls kein Gutschein gewählt wurde
            if (selectedOption === "0" || selectedOption.toLowerCase() === "keiner") return;
            
            // Wähle den passenden Regelsatz: Gutschein 1 oder Gutschein 2
            const rules = index === 0 ? voucherRules.gutschein1 : voucherRules.gutschein2;
            const rule = rules[selectedOption];
            if (rule) {
                if (rule.disable.condition(mainIndex)) {
                    rule.disable.elements.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.disabled = true;
                            if (element.type === 'checkbox') {
                                element.checked = false;
                            }
                        }
                    });
                }
                if (rule.additionalActions) {
                    rule.additionalActions();
                }
            }
        });
    }

    // Preisberechnung
    function updatePrice() {
        let total = 0;
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        if (mainIndex === -1) return;

        Object.entries(priceConfig).forEach(([name, config]) => {
    const element = document.querySelector(config.selector);
    if (!element || element.disabled) return;

    if (config.isDropdown) {
        // Dropdown-Auswahl (z. B. Felgen, Headlights)
        const selectedValue = parseInt(element.value);
        if (!isNaN(selectedValue) && selectedValue >= 0) {
            const priceArray = config.prices[selectedValue] || [];
            total += priceArray[mainIndex] || 0;
        }
    } else if (config.isQuantity) {
        // 👈 NEU: Mengenfelder (z. B. Fastrepairkits)
        const qty = parseInt(element.value) || 0;
        total += qty * (config.prices[mainIndex] || 0);
    } else {
        // Standard: Checkbox oder einfache Inputs
        if (element.type === 'checkbox' ? element.checked : !!element.value) {
            total += config.prices[mainIndex] || 0;
        }
    }
});

        const fahrzeugteileConfig = priceConfig['Fahrzeugteile'];
        const currentAnzahl = parseInt(document.getElementById('fahrzeugteile-anzahl').textContent);
        total += currentAnzahl * fahrzeugteileConfig.prices[mainIndex];

        // Rabatt-Optionen:
        const zuordnungSelect = document.getElementById('zuordnungSelect');
        if (zuordnungSelect) {
            const optionVal = zuordnungSelect.value.toLowerCase();
            console.log("Debug: Dropdown 'zuordnungSelect' value:", optionVal);
            if (optionVal === 'carlounge') {
                total *= 0.5;
            } else if (optionVal.includes('vip2')) {
                total *= 0.6
            } else if (optionVal.includes('vip')) {
                // Wenn Fahrzeugtyp bereits gewählt, entsprechend 30 % (privatauto) oder 40 % (frakdienstauto)
                const carType = document.querySelector('input[name="contractType"]:checked');
                if (carType) {
                    console.log("Debug: Radiobutton 'contractType' selected:", carType.value);
                    if (carType.value === 'privatauto') { // Privatauto
                        total *= 0.7;
                    } else if (carType.value === 'frakdienstauto') { // Frak/Dienstauto
                        total *= 0.6;
                    }
                } else {
                    console.log("Debug: Kein Fahrzeugtyp ausgewählt, defaulting to 30% discount");
                    total *= 0.7;
                }
            }
        }
        
        priceDisplay.textContent = new Intl.NumberFormat('de-DE', { useGrouping: false }).format(total);

    }

    // Event-Listener für Main Options mit Reset der Gruppen
    mainOptions.forEach(option => {
        option.addEventListener('change', () => {
            anzahl = 0;
            updateCounter();

            // Spezielles Reset für option-items, falls vorhanden
            document.querySelectorAll('.option-items input, .option-items select').forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            // Reset der Gruppen: option-items, input-group, gutschein-group, felgen-group, headlights-group
            ['option-item', 'input-group', 'gutschein-group', 'felgen-group', 'headlights-group'].forEach(className => {
                document.querySelectorAll('.' + className).forEach(group => {
                    group.querySelectorAll('input, select').forEach(input => {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                    });
                });
            });
            const infoBox = document.getElementById('zuordnungInfo');
            if (infoBox) {
                infoBox.style.display = 'none';
 // Oder falls du eine Standardnachricht setzen willst: infoBox.innerHTML = 'Wähle eine Option';
            }

            const zuordnungSelect = document.getElementById('zuordnungSelect');
            if (zuordnungSelect) {
                zuordnungSelect.value = 'zivilist';  // Hier den Wert explizit auf 'zivilist' setzen
                // Optional: Event auslösen, damit die Preisberechnung mit dem neuen Wert funktioniert
                $(zuordnungSelect).trigger('change');
            }

            handleVoucherChanges();
            updatePrice();
        });
    });

    Object.values(priceConfig).forEach(config => {
        const element = document.querySelector(config.selector);
        if (element) {
            if (config.isDropdown) {
                element.addEventListener('change', () => {
                    handleVoucherChanges();
                    updatePrice();
                });
            } else {
                element.addEventListener('change', updatePrice);
            }
        }
    });

    document.querySelectorAll('.check-box').forEach(element => {
        element.addEventListener('change', updatePrice);
    });

    // Event-Listener für beide Gutschein-Dropdowns hinzufügen
    const gutschein1 = document.getElementById('gutschein1');
    if (gutschein1) {
        gutschein1.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }
    const gutschein2 = document.getElementById('gutschein2');
    if (gutschein2) {
        gutschein2.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }

    // Event-Listener für das Dropdown "zuordnungSelect"
    const zuordnungSelect = document.getElementById('zuordnungSelect');
    if (zuordnungSelect) {
        zuordnungSelect.addEventListener('change', updatePrice);
    }
    
    // *** WICHTIG: Event-Listener für die Radiobuttons des Fahrzeugtyps ***
    document.querySelectorAll('input[name="contractType"]').forEach(input => {
        input.addEventListener('change', updatePrice);
    });

    // Initialisierung
    handleVoucherChanges();
    updatePrice();
});

// Hauptoptionen-Handler
function onlyOne(checkbox) {
    const checkboxes = document.querySelectorAll('.main-option');
    checkboxes.forEach(item => {
        if (item !== checkbox) item.checked = false;
    });
}

    // Überprüfen und anpassen des Platzhalters beim Öffnen des Dropdowns



  window.onload = function() {
    const dienstnummer = localStorage.getItem("dienstnummer");

    if (dienstnummer) {
      document.querySelector('.dienstnummer-info').innerHTML = `Dienstnummer des Arbeiters: ${dienstnummer}`;
    } else {
      console.error("Dienstnummer nicht gefunden.");
    }

    document.getElementById("sendenButton").addEventListener("click", () => {
      const workerNumber = localStorage.getItem("dienstnummer") || "Unbekannt";
      const customerName = document.getElementById("kundenname").value;
      let finalPrice = document.getElementById("total-price").textContent;

      const headlightsValue = document.getElementById("headlights").value;
      if (headlightsValue === "1") {
        finalPrice += " (inkl. Headlights)";
      } else if (headlightsValue === "2") {
        finalPrice += " (inkl. Headlightsfarbe)";
      }

      const customKennzeichenChecked = document.getElementById("customkennzeichen").checked;
      if (customKennzeichenChecked) {
        finalPrice += " (inkl. Kennzeichen)";
      }

      const zuordnungSelect = $('#zuordnungSelect');
      const zuordnungValue = zuordnungSelect.val();
      const zuordnungText = zuordnungSelect.find("option:selected").text();
      const filteredZuordnungText = zuordnungText.replace(/[^\p{L}\s]/gu, '');

      const dienstnummerValue = document.getElementById("dienstnummerkunde").value;
      const voucher1Value = document.getElementById("gutschein1").value;
      const voucher2Value = document.getElementById("gutschein2").value;

      let voucherCount = 0;
      if (voucher1Value && voucher1Value !== "0") voucherCount++;
      if (voucher2Value && voucher2Value !== "0") voucherCount++;

      const voucherText = voucherCount > 0 ? ` -- Gutschein: [${voucherCount}]` : "";
      const dienstnummerText = dienstnummerValue ? ` -- Dienstnummer: ${dienstnummerValue}` : "";

      const message = `${workerNumber} - ${customerName} | ${finalPrice} | ${filteredZuordnungText}${dienstnummerText}${voucherText}`;

      // ✅ Funktion hier aufrufen, nachdem message definiert ist
      function senden() {
        fetch("https://workers-playground-nameless-salad-f6a4.jasi-lindernm.workers.dev", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secret": "carloungeistcool321123"
          },
          body: JSON.stringify({
            content: message
          })
        })
        .then(response => response.text())
        .then(data => console.log("Erfolg:", data))
        .catch(error => console.error("Fehler:", error));
      }

      senden(); // ✅ Hier wird sie aufgerufen – alles ist bereit
    });
  };
    
