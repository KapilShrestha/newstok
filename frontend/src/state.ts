// frontend/src/state.ts

export const appState = {
    selectedCategory: null as string | null,
    categories: [] as string[], // Initialize with an empty array
  };
  
  export function setCategory(category: string | null) {
    appState.selectedCategory = category;
  }
  
  export function setCategories(categories: string[]) {
    appState.categories = categories;
  }
  