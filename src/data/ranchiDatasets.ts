// src/data/ranchiDatasets.ts

export const RANCHI_BLOCK_DATA = {
    "Ranchi Urban": {
        water_cgwb: "Severe Depletion. Significant groundwater stress due to 6,000+ persons/km² density.",
        soil_nbsslup: "Highly urbanized. Heavy surface runoff due to concrete surfaces.",
        health_idsp: "High risk of dengue/malaria outbreaks during monsoon due to blocked drainage."
    },
    "Kanke": {
        water_cgwb: "High Stress. Stage of groundwater development is critical; water table depleting 1m+ annually.",
        soil_nbsslup: "Moderate erosion. Peri-urban expansion affecting arable land.",
        health_idsp: "Elevated risk of waterborne diseases due to Kanke Dam sewage contamination."
    },
    "Ormanjhi": {
        water_cgwb: "Moderate Stress. Heavy reliance on minor irrigation tanks.",
        soil_nbsslup: "Severe Topsoil Erosion (Chotanagpur granite-gneiss). Loss of soil retention capacity.",
        health_idsp: "Low risk. Isolated cases of seasonal vector-borne diseases."
    },
    "Ratu": {
        water_cgwb: "Moderate Depletion. Rapid peri-urban industrialization affecting local aquifers.",
        soil_nbsslup: "High conversion of agricultural land to commercial plots; disrupting natural drainage.",
        health_idsp: "Moderate risk of respiratory issues due to unregulated brick kilns."
    },
    "Namkum": {
        water_cgwb: "Critical Zone. Industrial extraction severely impacting domestic borewells.",
        soil_nbsslup: "Soil contamination observed near industrial clusters and legacy waste dumps.",
        health_idsp: "High incidence of vector-borne diseases due to stagnant water in waste accumulation."
    },
    "Angara": {
        water_cgwb: "Safe Zone, but highly dependent on seasonal forest streams.",
        soil_nbsslup: "Very High Soil Erosion vulnerability due to inappropriate agricultural practices.",
        health_idsp: "Low risk, but vulnerable to seasonal tribal nutritional deficiencies."
    },
    "Bero": {
        water_cgwb: "Moderate Stress. Potpota watershed requires active conservation.",
        soil_nbsslup: "Extremely to strongly acidic soil; multi-nutrient deficiencies impacting crop yield.",
        health_idsp: "Low risk. Predominantly agrarian health profile."
    },
    "Hatia": {
        water_cgwb: "High Stress. Heavy industrial water consumption (Heavy Engineering Corporation belt).",
        soil_nbsslup: "Industrial topsoil degradation and heavy metal runoff.",
        health_idsp: "High risk of occupational health hazards and groundwater toxicity."
    }
};

// We extract the keys to use in your Citizen dropdown menu
export const RANCHI_BLOCKS = Object.keys(RANCHI_BLOCK_DATA);

export const SEED_CHALLENGES = [
    {
        id: "chal-001",
        title: "Severe Eutrophication in Kanke Dam",
        description: "Direct discharge of untreated sewage is causing algal blooms in Kanke Dam.",
        district: "Kanke",
        status: "Submitted",
        industryFunded: false,
        industryPartner: "",
        ai_analysis: {
            domain: "Water Contamination & Public Health",
            priority: "High",
            keywords: ["eutrophication", "sewage", "toxicity"],
            duplicate_flag: false,
            recommended_uni: "RIMS Ranchi",
            match_reason: "Matches RIMS capabilities in Public Health and Epidemiological research.",
            uni_pov_reason: "Your university's Public Health and Epidemiological research departments are required to investigate this waterborne hazard."
        }
    },
    {
        id: "chal-002",
        title: "Depleting Groundwater & Failed Rainwater Harvesting",
        description: "Large complexes are not maintaining rainwater harvesting pits.",
        district: "Ranchi Urban",
        status: "Validated",
        industryFunded: false,
        industryPartner: "",
        ai_analysis: {
            domain: "Urban Infrastructure & Hydrology",
            priority: "High",
            keywords: ["groundwater", "compliance", "water scarcity"],
            duplicate_flag: true,
            duplicate_count: 3,
            merged_reports: ["Report #102", "Report #105"],
            recommended_uni: "BIT Mesra, Ranchi",
            match_reason: "Requires BIT Mesra's Remote Sensing and Urban Infrastructure expertise.",
            uni_pov_reason: "Your university's Remote Sensing and Urban Infrastructure labs are required to analyze these failed rainwater harvesting pits."
        },
        imageUrl: "https://images.unsplash.com/photo-1541888087817-4861b58540c4?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "chal-003",
        title: "Severe Topsoil Erosion and Declining Crop Yields",
        description: "Farmers are experiencing severe topsoil erosion due to heavy surface runoff.",
        district: "Ormanjhi",
        status: "In Progress",
        industryFunded: true,
        industryPartner: "Tata Trusts (Mock CSR)",
        ai_analysis: {
            domain: "Agriculture & Soil Conservation",
            priority: "Medium",
            keywords: ["soil erosion", "runoff", "mono-cropping"],
            duplicate_flag: false,
            recommended_uni: "Birsa Agricultural University (BAU), Kanke",
            match_reason: "Aligns with BAU's Soil Science Department for developing localized conservation techniques.",
            uni_pov_reason: "Your Soil Science Department is best positioned to develop localized conservation techniques for this erosion issue."
        }
    },
    {
        id: "chal-004",
        title: "Unregulated Brick Kilns Affecting Air Quality",
        description: "Unregulated brick kilns on the urban fringe are causing severe particulate pollution.",
        district: "Ratu",
        status: "Submitted",
        industryFunded: false,
        industryPartner: "",
        ai_analysis: {
            domain: "Environmental Engineering",
            priority: "Medium",
            keywords: ["air pollution", "brick kilns", "particulate matter"],
            duplicate_flag: false,
            recommended_uni: "Central University of Jharkhand (CUJ)",
            match_reason: "CUJ's Department of Environmental Sciences specializes in air quality monitoring.",
            uni_pov_reason: "Your Department of Environmental Sciences is requested to monitor and assess the air quality impacts here."
        }
    },
    {
        id: "chal-005",
        title: "Industrial Leachate Contaminating Domestic Borewells",
        description: "Leachate from legacy industrial waste dumps is seeping into the aquifer.",
        district: "Namkum",
        status: "Validated",
        industryFunded: false,
        industryPartner: "",
        ai_analysis: {
            domain: "Groundwater Toxicity",
            priority: "High",
            keywords: ["leachate", "heavy metals", "aquifer contamination"],
            duplicate_flag: false,
            recommended_uni: "BIT Mesra, Ranchi",
            match_reason: "BIT Mesra has the lab capacity for heavy metal water analysis.",
            uni_pov_reason: "Your advanced labs for heavy metal water analysis are needed to assess this groundwater toxicity."
        }
    },
    {
        id: "chal-006",
        title: "Forest Degradation and Severe Watershed Erosion",
        description: "Inappropriate agricultural expansion is causing severe soil loss.",
        district: "Angara",
        status: "In Progress",
        industryFunded: true,
        industryPartner: "NABARD (Mock CSR)",
        ai_analysis: {
            domain: "Watershed Management",
            priority: "High",
            keywords: ["forest degradation", "watershed", "silting"],
            duplicate_flag: false,
            recommended_uni: "Birsa Agricultural University (BAU), Kanke",
            match_reason: "BAU's Forestry wings are positioned to intervene in the catchment.",
            uni_pov_reason: "Your Forestry wings are best equipped to intervene and manage this deteriorating catchment area."
        }
    },
    {
        id: "chal-007",
        title: "High Soil Acidity Affecting Tribal Livelihoods",
        description: "The Potpota watershed area is showing extreme soil acidity.",
        district: "Bero",
        status: "Completed",
        industryFunded: true,
        industryPartner: "Ministry of Agriculture",
        ai_analysis: {
            domain: "Agronomy & Soil Health",
            priority: "Medium",
            keywords: ["soil acidity", "nutrient deficiency", "tribal livelihoods"],
            duplicate_flag: false,
            recommended_uni: "Birsa Agricultural University (BAU), Kanke",
            match_reason: "Directly mapped to BAU's soil correction protocols.",
            uni_pov_reason: "Your Agronomy department's soil correction protocols are urgently needed to restore tribal livelihoods."
        }
    },
    {
        id: "chal-008",
        title: "Industrial Machinery Waste Dumping",
        description: "Improper disposal of metallurgical slag is creating hazardous zones.",
        district: "Hatia",
        status: "Submitted",
        industryFunded: false,
        industryPartner: "",
        ai_analysis: {
            domain: "Industrial Waste Management",
            priority: "High",
            keywords: ["slag", "machining waste", "metallurgy"],
            duplicate_flag: false,
            recommended_uni: "NIAMT Ranchi",
            match_reason: "NIAMT is capable of designing slag recycling solutions.",
            uni_pov_reason: "Your expertise in metallurgy and slag recycling solutions is required to safely dispose of this waste."
        }
    }
];

// Append this to the bottom of src/data/ranchiDatasets.ts

export const REGISTERED_UNIVERSITIES = [
    {
        id: "uni-001",
        name: "Birsa Agricultural University (BAU), Kanke",
        expertise: ["Agriculture", "Soil Science", "Forestry"],
        facilities: "Advanced Soil Testing Lab, Crop Research Center",
        contact_nodal: "Dr. A. Kumar (Dean of Agronomy)"
    },
    {
        id: "uni-002",
        name: "BIT Mesra, Ranchi",
        expertise: ["Urban Infrastructure", "Remote Sensing", "Environmental Eng."],
        facilities: "Satellite Data Processing Lab, AI Innovation Hub",
        contact_nodal: "Dr. S. Singh (Head of Remote Sensing)"
    },
    {
        id: "uni-003",
        name: "RIMS Ranchi",
        expertise: ["Public Health", "Epidemiology", "Sanitation"],
        facilities: "Infectious Disease Research Center, Toxicology Lab",
        contact_nodal: "Dr. P. Jha (Community Medicine)"
    },
    {
        id: "uni-004",
        name: "Central University of Jharkhand (CUJ)",
        expertise: ["Environmental Sciences", "Tribal Welfare", "Renewable Energy"],
        facilities: "Air Quality Monitoring Station",
        contact_nodal: "Dr. M. Oraon (Environmental Sci.)"
    },
    {
        id: "uni-005",
        name: "NIAMT Ranchi",
        expertise: ["Industrial Waste Management", "Metallurgy", "Manufacturing"],
        facilities: "Advanced Slag Recycling Unit, Heavy Materials Lab",
        contact_nodal: "Dr. V. Sharma (Metallurgical Eng.)"
    }
];

export const INDUSTRY_PARTNERS = [
    {
        id: "ind-001",
        name: "Tata Trusts (CSR Wing)",
        focus_areas: ["Rural Livelihoods", "Agriculture", "Water Conservation"],
        funding_tier: "Tier 1 (High Capacity)",
        active_projects: 2
    },
    {
        id: "ind-002",
        name: "NABARD",
        focus_areas: ["Watershed Management", "Forestry", "Tribal Development"],
        funding_tier: "Tier 1 (High Capacity)",
        active_projects: 1
    },
    {
        id: "ind-003",
        name: "Heavy Engineering Corporation (HEC) CSR",
        focus_areas: ["Industrial Waste", "Occupational Health", "Local Infrastructure"],
        funding_tier: "Tier 2 (Medium Capacity)",
        active_projects: 0
    }
];