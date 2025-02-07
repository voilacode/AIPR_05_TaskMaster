// script.js
const builderArea = document.getElementById('builderArea');
const saveBtn = document.getElementById('saveBtn');
let selectedElement = null;

// Handle drag-and-drop
document.querySelectorAll('.element').forEach(el => {
    el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', el.dataset.type);
    });
});

builderArea.addEventListener('dragover', (e) => e.preventDefault());
builderArea.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const type = e.dataTransfer.getData('type');
    const newElement = document.createElement(type); // Create the actual element type
    
    if (type === 'h1') newElement.textContent = 'Heading';
    else if (type === 'p') newElement.textContent = 'Paragraph';
    else if (type === 'button') newElement.textContent = 'Button';
    else if (type === 'a') {
        newElement.textContent = 'Anchor';
        newElement.href = '#';
    } else if (type === 'ul') {
        newElement.innerHTML = '<li>List Item</li>';
    } else if (type === 'input') {
        newElement.placeholder = 'Input Field';
    } else {
        newElement.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    }

    newElement.contentEditable = type !== 'input' && type !== 'ul' && type !== 'form'; // Prevent editability for some elements
    newElement.className = `${type} rounded`; // Add "rounded" class
    newElement.style.border = '1px solid #000';
    newElement.style.padding = '8px'; // Add padding for spacing
    newElement.addEventListener('click', () => selectElement(newElement));
    
    builderArea.appendChild(newElement);
});

function selectElement(el) {
    selectedElement = el;
    document.getElementById('stylePanel').style.display = 'block';
    document.getElementById('colorPicker').value = el.style.color || '#000000';
    document.getElementById('bgColorPicker').value = el.style.backgroundColor || '#ffffff';
    document.getElementById('fontSize').value = parseInt(el.style.fontSize) || 16;
    document.getElementById('padding').value = parseInt(el.style.padding) || 0;
    document.getElementById('margin').value = parseInt(el.style.margin) || 0;
    document.getElementById('fontWeight').value = el.style.fontWeight || 'normal';
    document.getElementById('textAlign').value = el.style.textAlign || 'left';
    document.getElementById('flexDirection').value = el.style.flexDirection || 'row';
    document.getElementById('justifyContent').value = el.style.justifyContent || 'flex-start';
}

document.getElementById('colorPicker').addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.color = e.target.value;
});

document.getElementById('bgColorPicker').addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.backgroundColor = e.target.value;
});

document.getElementById('fontSize').addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.fontSize = e.target.value + 'px';
});

document.getElementById('padding').addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.padding = e.target.value + 'px';
});

document.getElementById('margin').addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.margin = e.target.value + 'px';
});

document.getElementById('fontWeight').addEventListener('change', (e) => {
    if (selectedElement) selectedElement.style.fontWeight = e.target.value;
});

document.getElementById('textAlign').addEventListener('change', (e) => {
    if (selectedElement) selectedElement.style.textAlign = e.target.value;
});

document.getElementById('flexDirection').addEventListener('change', (e) => {
    if (selectedElement) selectedElement.style.flexDirection = e.target.value;
});

document.getElementById('justifyContent').addEventListener('change', (e) => {
    if (selectedElement) selectedElement.style.justifyContent = e.target.value;
});

saveBtn.addEventListener('click', async () => {
    const elements = [];
    builderArea.childNodes.forEach(el => {
        if (el.nodeType === 1) {
            elements.push({
                type: el.className,
                content: el.textContent,
                styles: el.style.cssText
            });
        }
    });
    
    const name = prompt('Enter a name for your page:');
    if (name) {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
            const response = await fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken },
                body: JSON.stringify({ name, content: elements })
            });
            const result = await response.json();
            alert(result.message);
        } catch (err) {
            console.error('Error:', err);
            alert('Error saving page');
        }
    }
});

async function loadPage(id) {
    try {
        const response = await fetch(`/page/${id}`);
        const data = await response.json();
        
        if (!data.content) return alert('No content found');

        builderArea.innerHTML = ''; // Clear existing elements

        JSON.parse(data.content).forEach(el => {
            const newElement = document.createElement(el.type);
            newElement.textContent = el.content;
            newElement.style.cssText = el.styles;
            newElement.className = el.type;
            newElement.style.border = '1px solid #000';
            newElement.addEventListener('click', () => selectElement(newElement));
            
            builderArea.appendChild(newElement);
        });
    } catch (err) {
        console.error('Error loading page:', err);
        alert('Error loading page');
    }
}
