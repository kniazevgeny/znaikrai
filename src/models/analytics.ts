export interface subcategory {
    name: string,
    total_count: number,
    total_count_appeals: number,
    values: Map<string, number>
}

export interface category {
    name: string,
    total_count: number,
    total_count_appeals: number,
    count_by_years: Map<string, number>
    subcategories: Map<string, subcategory>
}

export interface resp {
    total_count: number,
    total_count_appeals: number,
    total_count_appeals_corona: number,
    violations_stats: Map<string, category>
}