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

/**
 * The trees items
 */
const items = Array.from(tree.querySelectorAll('fluent-card'));
const items2 = Array.from(tree2.querySelectorAll('fluent-card'));

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

    if (Array.from(parent.children).indexOf(currentElement) !== 0) {
      currentElement.after(dragItem);
    } else {
      parent.insertBefore(dragItem, currentElement);
    }
  }

  return false;
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
