import {
  fluentTreeItem,
  fluentTreeView,
  fluentCard,
  provideFluentDesignSystem,
} from '@fluentui/web-components';
import './style.css';

/**
 * Register with the Fluent Design System.
 */
export const FluentDesignSystem = provideFluentDesignSystem().register(
  fluentTreeItem(),
  fluentTreeView(),
  fluentCard()
);

/**
 * The item being dragged
 */
let dragItem;

/**
 * The tree views
 */
const tree = document.getElementById('tree');
const tree2 = document.getElementById('tree2');
const dropAreaDefault1 = document.getElementById('drop-area-default1');
const dropAreaDefault2 = document.getElementById('drop-area-default2');

/**
 * The trees items
 */
const items = Array.from(tree.querySelectorAll('fluent-card'));
const items2 = Array.from(tree2.querySelectorAll('fluent-card'));

const dropZonesHeight = getDropZonesHeight(items, items2, 8);
dropAreaDefault1.style.height = `${dropZonesHeight.height[0]}px`;
dropAreaDefault2.style.height = `${dropZonesHeight.height[1]}px`;

/**
 * The drag start event
 */
function handleDragStart(e) {
  dragItem = e.currentTarget;

  dragItem.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

/**
 * The drag end event
 */
function handleDragEnd(e) {
  dragItem.classList.remove('dragging');
  dragItem.removeAttribute('class');
}

/**
 * The drop event
 */
function handleDrop(e) {
  e.preventDefault();

  const currentElement: HTMLElement = e.currentTarget;
  const parent = currentElement.parentElement;

  if (dragItem !== currentElement) {
    dragItem.parentElement!.removeChild(dragItem);

    if (currentElement.id.includes('drop-area-default')) {
      // add dragItem into empty area
      parent.insertBefore(dragItem, currentElement);
    } else {
      if (Array.from(parent.children).indexOf(currentElement) !== 0) {
        currentElement.after(dragItem);
      } else {
        parent.insertBefore(dragItem, currentElement);
      }
    }

    const items = Array.from(tree.querySelectorAll('fluent-card'));
    const items2 = Array.from(tree2.querySelectorAll('fluent-card'));

    const dropZonesHeight = getDropZonesHeight(items, items2, 8);
    console.log(`${dropZonesHeight.height[0]},`);
    dropAreaDefault1.style.height = `${dropZonesHeight.height[0]}px`;
    dropAreaDefault2.style.height = `${dropZonesHeight.height[1]}px`;
  }

  return false;
}

function getDropZonesHeight(items, items2, marginBottom: number) {
  let col1Height = 0;
  let col2Height = 0;
  let dropZone1Height = 0;
  let dropZone2Height = 0;

  // elements in first column
  items.forEach((item) => {
    // col1Height += item.clientHeight + marginBottom;
    col1Height += 19 + marginBottom;
  });

  // elements in second column
  items2.forEach((item) => {
    // col2Height += item.clientHeight + marginBottom;
    col2Height += 19 + marginBottom;
  });

  if (col1Height < col2Height) {
    dropZone1Height = col2Height - col1Height;
    dropZone2Height = marginBottom;
  } else if (col1Height > col2Height) {
    dropZone1Height = marginBottom;
    dropZone2Height = col1Height - col2Height;
  } else {
    dropZone1Height = marginBottom;
    dropZone2Height = marginBottom;
  }

  return {
    height: [dropZone1Height, dropZone2Height],
  };
}

/**
 * Add our listeners for drag and drop
 */
items.forEach((item) => {
  // set the draggable attribute to true
  item.setAttribute('draggable', 'true');
  // add our dragstart event
  item.addEventListener('dragstart', handleDragStart);
  // add our dragover event to enable our drop
  item.addEventListener('dragover', (e) => {
    e.preventDefault();

    return false;
  });
  // add our dragend event
  item.addEventListener('dragend', handleDragEnd);
  // add our drop event
  item.addEventListener('drop', handleDrop);
});

/**
 * Add our listeners for drag and drop
 */
items2.forEach((item) => {
  // set the draggable attribute to true
  item.setAttribute('draggable', 'true');
  // add our dragstart event
  item.addEventListener('dragstart', handleDragStart);
  // add our dragover event to enable our drop
  item.addEventListener('dragover', (e) => {
    e.preventDefault();

    return false;
  });
  // add our dragend event
  item.addEventListener('dragend', handleDragEnd);
  // add our drop event
  item.addEventListener('drop', handleDrop);
});

dropAreaDefault1.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.add('dragging');
});

dropAreaDefault1.addEventListener('dragenter', (e) => {
  e.preventDefault();
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.add('dragging');
});

dropAreaDefault1.addEventListener('dragleave', (e) => {
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.remove('drag-over');
  dragItem.classList.remove('dragging');
});

dropAreaDefault1.addEventListener('drop', handleDrop);

dropAreaDefault2.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.add('dragging');
});

dropAreaDefault2.addEventListener('dragenter', (e) => {
  e.preventDefault();
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.add('dragging');
});

dropAreaDefault2.addEventListener('dragleave', (e) => {
  const dragItem = e.currentTarget as HTMLElement;
  dragItem.classList.remove('drag-over');
  dragItem.classList.remove('dragging');
});

dropAreaDefault2.addEventListener('drop', handleDrop);
