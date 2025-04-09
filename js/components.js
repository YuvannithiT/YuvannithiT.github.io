export async function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container element with ID "${containerId}" not found.`);
        return false;
    }
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component from ${componentPath}: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        return true;
    } catch (error) {
        console.error('Error loading component:', error);
        return false;
    }
}