// This file stores the main dye data array.
export const allDyes = [
    // Solvent Yellow (SY)
    {
        name: '溶劑黃 98', code: 'S.Y. 98', color: '#F4FF09',
        common_name_en: 'Solvent Yellow 98',
        colour_index_no: 'C.I. 56238', 
        cas_no: '12671-74-8',
        chemical_class: 'Monoazo',
        heat_stability_test: 'Tested at Transparent (0.05%) and Reduction (0.2%+1.0%TiO2) concentrations',
        heat_stability_data: [
            { polymer: 'PS', temp: '300' },
            { polymer: 'ABS', temp: '300' },
            { polymer: 'PC', temp: '340' },
            { polymer: 'PET', temp: '300' }
        ],
        light_fastness_test: 'Tested at Transparent (0.05%) and Reduction (0.2%+1.0%TiO2) concentrations',
        light_fastness_data: {
            PS: { 'Transparent (0.05%)': '7', 'Reduction (0.2%+1.0%TiO₂)': '4-5' },
            ABS: { 'Transparent (0.05%)': '5-6', 'Reduction (0.2%+1.0%TiO₂)': '3' },
            PC: { 'Transparent (0.05%)': '7-8', 'Reduction (0.2%+1.0%TiO₂)': '6' },
            PET: { 'Transparent (0.05%)': '7', 'Reduction (0.2%+1.0%TiO₂)': '7' },
            'PVC-R': { 'Transparent (0.05%)': '7', 'Reduction (0.2%+1.0%TiO₂)': '5-6' }
        },
        compatible_polymers: [
            { polymer: 'PVC-R', status: 'recommended' },
            { polymer: 'LDPE', status: 'not recommended' },
            { polymer: 'HDPE', status: 'not recommended' },
            { polymer: 'PP', status: 'not recommended' },
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }, 
            { polymer: 'SAN', status: 'recommended' }, 
            { polymer: 'Rubber', status: 'not recommended' },
            { polymer: 'POM', status: 'not recommended' }
        ],
        applications: ['General plastics coloring', 'Masterbatches'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 157', code: 'S.Y. 157', color: '#F2F469',
        common_name_en: 'Solvent Yellow 157', colour_index_no: 'C.I. Not Available', cas_no: '27908-75-4',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' } 
        ],
        applications: ['Polyester coloring', 'Spin dyeing'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 33', code: 'S.Y. 33', color: '#E3E64D',
        common_name_en: 'Solvent Yellow 33',
        colour_index_no: 'C.I. 47000', 
        cas_no: '8003-22-3',
        ec_no: '232-318-2',
        chemical_class: 'Quinoline', 
        physical_properties: 'Yellow powder, greenish yellow light. Soluble in sulfuric acid, DMF and pyridine, hardly soluble in ethanol, insoluble in water.', 
        melting_point: '230°C', 
        bulk_density: '0.21g/ml', 
        heat_stability: '280°C', 
        light_fastness: '7', 
        migration_resistance: '4-5', 
        metal_content: 'Total <200ppm (Fe<100, As<4, Ba<4, Cr<3, Hg<0.05, Zn<10, Pb<1, Se<4, Sb<4, Cd<0.05 ppm)',
        compatible_polymers: [ 
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'Polyester Fiber', status: 'recommended' } 
        ],
        applications: ['Coloring of PS, ABS, PC, PMMA, PET, SAN and other resins', 'Dyeing of polyester superfine fibers', 'Used as solvent dye'], 
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 93', code: 'S.Y. 93', color: '#F4EB1F',
        common_name_en: 'Solvent Yellow 93', colour_index_no: 'C.I. 48160', cas_no: '4702-90-3',
        heat_stability: '300°C', light_fastness: '7-8', 
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['Engineering plastics', 'High-performance applications'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 147', code: 'S.Y. 147', color: '#E2DD4C',
        common_name_en: 'Solvent Yellow 147', colour_index_no: 'C.I. Not Available', cas_no: '4118-16-5',
        heat_stability: '300°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 114', code: 'S.Y. 114', color: '#FEF93D',
        common_name_en: 'Solvent Yellow 114', colour_index_no: 'C.I. 47020', cas_no: '7576-65-0',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['General plastics', 'Transparent applications'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 176', code: 'S.Y. 176', color: '#FFF93E',
        common_name_en: 'Solvent Yellow 176', colour_index_no: 'C.I. Not Available', cas_no: '10319-14-9',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['Fiber coloring', 'Engineering plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 163', code: 'S.Y. 163', color: '#F7D643',
        common_name_en: 'Solvent Yellow 163',
        colour_index_no: 'C.I. 58840',
        cas_no: '13676-91-0',
        ec_no: 'Not Available', 
        chemical_class: 'Anthrapyridone',
        heat_stability_test: 'Typical values in common polymers',
        heat_stability_data: [ 
            { polymer: 'PS', temp: '300' },
            { polymer: 'ABS', temp: '300' },
            { polymer: 'PC', temp: '300' },
            { polymer: 'PMMA', temp: '300' },
            { polymer: 'PET', temp: '300' },
            { polymer: 'PBT', temp: '300' }
        ],
        light_fastness_test: 'Typical values in common polymers (PET Fiber Lightfastness: 8)',
        light_fastness_data: { 
            PS: { 'Rating': '7-8' },
            ABS: { 'Rating': '8' },
            PC: { 'Rating': '8' },
            PMMA: { 'Rating': '8' },
            PET: { 'Rating': '8' }
        },
        migration_resistance: 'Good',
        compatible_polymers: [
             { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' } 
        ],
        applications: ['High-performance plastics', 'Automotive parts', 'PET fiber coloring'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑黃 160:1', code: 'S.Y. 160:1', color: '#F4FF09',
        common_name_en: 'Solvent Yellow 160:1', colour_index_no: 'C.I. Not Available', cas_no: '35773-43-4',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }  
        ],
        applications: ['Engineering plastics', 'Polyester coloring'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑綠 3', code: 'S.G. 3', color: '#003549',
        common_name_en: 'Solvent Green 3', colour_index_no: 'C.I. 61565', cas_no: '128-80-3',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['General plastics', 'Fuel marking'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑綠 5', code: 'S.G. 5', color: '#deeb00',
        common_name_en: 'Solvent Green 5', colour_index_no: 'C.I. 59075', cas_no: '2744-50-5',
        heat_stability: '300°C', light_fastness: '5-6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['Fluorescent applications', 'Marking'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑綠 28', code: 'S.G. 28', color: '#008359',
        common_name_en: 'Solvent Green 28', colour_index_no: 'C.I. 625580', cas_no: '71839-01-5',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['Spin dyeing', 'High-performance applications'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑橙 60', code: 'S.O. 60', color: '#eb8300',
        common_name_en: 'Solvent Orange 60', colour_index_no: 'C.I. 564100', cas_no: '6925-69-5',
        applications: ['Engineering plastics', 'High temp applications', 'Transparent and opaque dyeing of PS, SAN, PMMA, PC, PA6 and PA6.6'],
        inquiry_link: 'https://hwashine.tw/contact/',
        related_info_link: '#', 
        heat_stability_test: 'in °C at 1/3 standard depth with 1% TiO₂ (ABS 4% TiO₂, and PS 2% TiO₂) evaluated accoding to DIN EN 12877',
        heat_stability_data: [
            { polymer: 'PS', temp: '300' },
            { polymer: 'SAN', temp: '280' },
            { polymer: 'ABS', temp: '280' },
            { polymer: 'PMMA', temp: '300' },
            { polymer: 'PC', temp: '350' },
            { polymer: 'PA6', temp: '300' },
            { polymer: 'PET', temp: '290' },
            { polymer: 'PBT', temp: '280' } 
        ],
        light_fastness_test: '1/3 standard depth with 1% TiO₂ (PS with 2% TiO₂) accoding to DIN EN ISO 4892-2',
        light_fastness_data: { 
            PC: { '染料 (%)': '0.155', 'Opaque 1.0% TiO₂': '7', 'Transp.': '7-8' },
            PS: { '染料 (%)': '0.280', 'Opaque 2.0% TiO₂': '6', 'Transp.': '7-8' },
            PMMA: { '染料 (%)': '0.155', 'Opaque 1.0% TiO₂': '6', 'Transp.': '7-8' }
        },
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PBT', status: 'recommended' } 
        ]
    },
    {
        name: '溶劑橙 107', code: 'S.O. 107', color: '#dc3e00',
        common_name_en: 'Solvent Orange 107', colour_index_no: 'C.I. Not Available', cas_no: '185766-20-5',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
        ],
        applications: ['Spin dyeing', 'Specialty polymers'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑橙 63', code: 'S.O. 63', color: '#ff6300',
        common_name_en: 'Solvent Orange 63', colour_index_no: 'C.I. 68550', cas_no: '12694-75-0',
        heat_stability: '280°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PBT', status: 'recommended' }
        ],
        applications: ['General plastics', 'Bright shades'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 197', code: 'S.R. 197', color: '#E52B50',
        common_name_en: 'Solvent Red 197', colour_index_no: 'C.I. 50370:1', cas_no: '52372-39-1',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['General plastics', 'Coatings'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 149', code: 'S.R. 149', color: '#f6004e',
        common_name_en: 'Solvent Red 149', colour_index_no: 'C.I. 674700', cas_no: '71902-18-6',
        heat_stability: '290°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PBT', status: 'recommended' }
        ],
        applications: ['Fluorescent red applications'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 196', code: 'S.R. 196', color: '#fe121a',
        common_name_en: 'Solvent Red 196', colour_index_no: 'C.I. 503745', cas_no: '52372-36-8',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 111', code: 'S.R. 111', color: '#de3415',
        common_name_en: 'Solvent Red 111', colour_index_no: 'C.I. 60505', cas_no: '82-38-2',
        heat_stability: '280°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['General plastics', 'Engineering plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 135', code: 'S.R. 135', color: '#d32106',
        common_name_en: 'Solvent Red 135', colour_index_no: 'C.I. 564120', cas_no: '71902-17-5',
        heat_stability: '300°C', light_fastness: '8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' } 
        ],
        applications: ['Engineering plastics', 'Automotive'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 179', code: 'S.R. 179', color: '#c81a0c',
        common_name_en: 'Solvent Red 179', colour_index_no: 'C.I. 564150', cas_no: '89106-94-5',
        heat_stability: '300°C', light_fastness: '8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' } 
        ],
        applications: ['High temperature plastics', 'Spin dyeing'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 169', code: 'S.R. 169', color: '#da2b21',
        common_name_en: 'Solvent Red 169', colour_index_no: 'C.I. Not Available', cas_no: '27354-18-3',
        heat_stability: '280°C', light_fastness: '6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
            ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 24', code: 'S.R. 24', color: '#ac0007',
        common_name_en: 'Solvent Red 24', colour_index_no: 'C.I. 26105', cas_no: '85-83-6',
        heat_stability: '250°C', light_fastness: '5-6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
            ],
        applications: ['General plastics', 'Oil coloring'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 168', code: 'S.R. 168', color: '#c50f24',
        common_name_en: 'Solvent Red 168', colour_index_no: 'C.I. Not Available', cas_no: '71832-19-4',
        heat_stability: '280°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 146', code: 'S.R. 146', color: '#e3012e',
        common_name_en: 'Solvent Red 146', colour_index_no: 'C.I. 12716', cas_no: '70956-30-8',
        heat_stability: '300°C', light_fastness: '5',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' }
        ],
        applications: ['General plastics', 'Transparent shades'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 195', code: 'S.R. 195', color: '#af001c',
        common_name_en: 'Solvent Red 195', colour_index_no: 'C.I. 165020', cas_no: '164251-88-1',
        heat_stability: '280°C', light_fastness: '8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['Spin dyeing'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 207', code: 'S.R. 207', color: '#c70056',
        common_name_en: 'Solvent Red 207', colour_index_no: 'C.I. 617001', cas_no: '10114-49-5',
        heat_stability: '260°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['General plastics', 'Bluer shade red'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紅 52', code: 'S.R. 52', color: '#b90187',
        common_name_en: 'Solvent Red 52', colour_index_no: 'C.I. 68210', cas_no: '81-39-0',
        heat_stability: '280°C', light_fastness: '7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' }
        ],
        applications: ['Engineering plastics', 'Fluorescent effects'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紫 59', code: 'S.V. 59', color: '#9d007f',
        common_name_en: 'Solvent Violet 59', colour_index_no: 'C.I. 60735', cas_no: '6408-72-6',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['Engineering plastics', 'Clear violet shades'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紫 11', code: 'S.V. 11', color: '#76006b',
        common_name_en: 'Solvent Violet 11', colour_index_no: 'C.I. 61100', cas_no: '128-95-0',
        heat_stability: '300°C', light_fastness: '5-6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紫 31', code: 'S.V. 31', color: '#57006d',
        common_name_en: 'Solvent Violet 31', colour_index_no: 'C.I. 61102', cas_no: '70956-27-3',
        heat_stability: '300°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['Engineering plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紫 37', code: 'S.V. 37', color: '#4b0782',
        common_name_en: 'Solvent Violet 37', colour_index_no: 'C.I. Not Available', cas_no: '61969-50-4',
        heat_stability: '300°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑紫 13', code: 'S.V. 13', color: '#150671',
        common_name_en: 'Solvent Violet 13', colour_index_no: 'C.I. 60725', cas_no: '81-48-1',
        heat_stability: '290°C',
        light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' }
        ],
        applications: ['General plastics', 'Fuel marking'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 35', code: 'S.B. 35', color: '#00429d',
        common_name_en: 'Solvent Blue 35', colour_index_no: 'C.I. 61554', cas_no: '17354-14-2',
        heat_stability: '280°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['General plastics', 'Fuel coloring'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 45', code: 'S.B. 45', color: '#07428c',
        common_name_en: 'Solvent Blue 45', colour_index_no: 'C.I. Not Available', cas_no: '37229-23-5',
        heat_stability: '200°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 36', code: 'S.B. 36', color: '#00409f',
        common_name_en: 'Solvent Blue 36', colour_index_no: 'C.I. 61551', cas_no: '14233-37-5',
        heat_stability: '280°C', light_fastness: '5',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['General plastics', 'Engineering plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 78', code: 'S.B. 78', color: '#002f80',
        common_name_en: 'Solvent Blue 78', colour_index_no: 'C.I. 615030', cas_no: '2475-44-7',
        heat_stability: '300°C', light_fastness: '5-6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' }
        ],
        applications: ['Engineering plastics', 'General purpose plastics', 'Masterbatches', 'Spin dyeing PET (limited)'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 97', code: 'S.B. 97', color: '#003884',
        common_name_en: 'Solvent Blue 97', colour_index_no: 'C.I. 615290', cas_no: '61969-44-6',
        heat_stability: '300°C', light_fastness: '7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' } 
        ],
        applications: ['High-performance plastics', 'Automotive', 'FDA compliant for PET (check specific regulations)'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 104', code: 'S.B. 104', color: '#003584',
        common_name_en: 'Solvent Blue 104', colour_index_no: 'C.I. 61568', cas_no: '116-75-6',
        heat_stability: '300°C', light_fastness: '6',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' },
            { polymer: 'PA6', status: 'recommended' }
        ],
        applications: ['Spin dyeing PET/PA', 'Engineering plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 59', code: 'S.B. 59', color: '#00277a',
        common_name_en: 'Solvent Blue 59', colour_index_no: 'C.I. 61552', cas_no: '6944-46-3',
        heat_stability: '280°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['General plastics', 'Inks'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 102', code: 'S.B. 102', color: '#003075',
        common_name_en: 'Solvent Blue 102', colour_index_no: 'C.I. Not Available', cas_no: '15403-56-2',
        heat_stability: '300°C', light_fastness: '5',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['Consult TDS'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 122', code: 'S.B. 122', color: '#1e2462',
        common_name_en: 'Solvent Blue 122', colour_index_no: 'C.I. 607260', cas_no: '67905-17-3',
        heat_stability: '300°C', light_fastness: '6-7',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['Plastics', 'Inks'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 63', code: 'S.B. 63', color: '#002e5d',
        common_name_en: 'Solvent Blue 63', colour_index_no: 'C.I. 61525', cas_no: '6408-50-0',
        heat_stability: '280°C', light_fastness: '5',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'SAN', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['General plastics'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
    {
        name: '溶劑藍 67', code: 'S.B. 67', color: '#02a7bb',
        common_name_en: 'Solvent Blue 67', colour_index_no: 'C.I. Not Available', cas_no: '12226-74-3',
        heat_stability: '300°C', light_fastness: '7-8',
        compatible_polymers: [
            { polymer: 'PS', status: 'recommended' },
            { polymer: 'ABS', status: 'recommended' },
            { polymer: 'PC', status: 'recommended' },
            { polymer: 'PMMA', status: 'recommended' },
            { polymer: 'PET', status: 'recommended' }
        ],
        applications: ['Printing inks', 'PA coloring'],
        inquiry_link: 'https://hwashine.tw/contact/'
    },
];