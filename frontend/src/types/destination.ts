// export interface DestinationGuide {
//     _id: string;
//     title: string;
//     summary: string;
//     description: string;
//     photos: string[];
//     history: string;
//     culture: string;
//     attractions: string[];
//     recommendations: {
//         lodging: string[];
//         dining: string[];
//         activities: string[];
//     };
// }

export interface DestinationGuide {
    _id: string;
    title: string;
    summary: string;
    description: string;
    photos: string[];
    history: string;
    culture: string;
    attractions: string[];
    recommendations: {
        lodging: string[];
        dining: string[];
        activities: string[];
    };
}
