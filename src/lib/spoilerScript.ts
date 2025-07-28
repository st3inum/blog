/**
 * Client-side script to make spoilers interactive - Hugo style
 */
export function initSpoilers(): void {
  console.log('Initializing Hugo-style spoilers with Markdown support...');
  
  // Process spoiler shortcodes in the content
  processSpoilerShortcodes();
  
  // Set up click handlers for spoiler blocks
  setupSpoilerClickHandlers();
}

/**
 * Process spoiler shortcodes and convert them to interactive elements
 */
function processSpoilerShortcodes(): void {
  // Process Hugo spoilers with encoded data attributes
  const hugoSpoilers = document.querySelectorAll('.hugo-spoiler');
  console.log(`Found ${hugoSpoilers.length} Hugo spoiler elements`);
  
  hugoSpoilers.forEach((spoiler, index) => {
    const spoilerElement = spoiler as HTMLElement;
    
    // Skip if this spoiler has already been processed
    if (spoilerElement.classList.contains('spoiler-processed')) {
      return;
    }
    
    // Mark as processed
    spoilerElement.classList.add('spoiler-processed');
    
    // Get encoded data attributes and decode them
    const encodedTitle = spoilerElement.getAttribute('data-spoiler-title') || '';
    const encodedContent = spoilerElement.getAttribute('data-spoiler-content') || '';
    const spoilerType = spoilerElement.getAttribute('data-spoiler-type');
    
    // Decode the title and content
    const title = decodeURIComponent(encodedTitle);
    const content = decodeURIComponent(encodedContent);
    
    console.log(`Processing Hugo spoiler ${index} of type ${spoilerType} with title: ${title}`);
    
    // Create the Hugo-style spoiler structure
    const spoilerDiv = document.createElement('div');
    spoilerDiv.className = 'spoiler panel panel-default';
    
    const spoilerBlock = document.createElement('div');
    spoilerBlock.className = 'spoiler_block';
    
    // Show link (initially visible) - use innerHTML to preserve HTML in title
    const showLink = document.createElement('a');
    showLink.href = '#';
    showLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-in spoiler_block_show';
    showLink.innerHTML = title; // Use innerHTML to preserve HTML formatting
    
    // Hide link (initially hidden)
    const hideLink = document.createElement('a');
    hideLink.href = '#';
    hideLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-out spoiler_block_hide';
    hideLink.style.display = 'none';
    hideLink.textContent = 'click to hide';
    
    // Content div (initially hidden)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'spoiler_block_content';
    contentDiv.style.display = 'none';
    contentDiv.innerHTML = content; // Content already has HTML formatting
    
    // Assemble the spoiler structure
    spoilerBlock.appendChild(showLink);
    spoilerBlock.appendChild(hideLink);
    spoilerBlock.appendChild(contentDiv);
    spoilerDiv.appendChild(spoilerBlock);
    
    // Replace the original element with our Hugo-style spoiler
    spoilerElement.parentNode?.replaceChild(spoilerDiv, spoilerElement);
  });
  
  // Also handle any legacy spoiler shortcodes
  const legacySpoilerShortcodes = document.querySelectorAll('.spoiler-shortcode');
  console.log(`Found ${legacySpoilerShortcodes.length} legacy spoiler shortcodes`);
  
  legacySpoilerShortcodes.forEach((spoiler, index) => {
    const spoilerElement = spoiler as HTMLElement;
    
    // Skip if this spoiler has already been processed
    if (spoilerElement.classList.contains('spoiler-processed')) {
      return;
    }
    
    // Mark as processed
    spoilerElement.classList.add('spoiler-processed');
    
    const title = spoilerElement.getAttribute('data-spoiler-title') || 'click to show';
    const content = spoilerElement.innerHTML;
    
    console.log(`Processing legacy spoiler shortcode ${index} with title: ${title}`);
    
    // Create the Hugo-style spoiler structure
    const spoilerDiv = document.createElement('div');
    spoilerDiv.className = 'spoiler panel panel-default';
    
    const spoilerBlock = document.createElement('div');
    spoilerBlock.className = 'spoiler_block';
    
    // Show link (initially visible) - use innerHTML to preserve HTML in title
    const showLink = document.createElement('a');
    showLink.href = '#';
    showLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-in spoiler_block_show';
    showLink.innerHTML = title; // Use innerHTML to preserve HTML formatting
    
    // Hide link (initially hidden)
    const hideLink = document.createElement('a');
    hideLink.href = '#';
    hideLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-out spoiler_block_hide';
    hideLink.style.display = 'none';
    hideLink.textContent = 'click to hide';
    
    // Content div (initially hidden)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'spoiler_block_content';
    contentDiv.style.display = 'none';
    contentDiv.innerHTML = content; // Content already has HTML formatting
    
    // Assemble the spoiler structure
    spoilerBlock.appendChild(showLink);
    spoilerBlock.appendChild(hideLink);
    spoilerBlock.appendChild(contentDiv);
    spoilerDiv.appendChild(spoilerBlock);
    
    // Replace the original element with our Hugo-style spoiler
    spoilerElement.parentNode?.replaceChild(spoilerDiv, spoilerElement);
  });
  
  // Also handle any legacy spoiler divs with data-spoiler-title attribute
  const legacySpoilers = document.querySelectorAll('div[data-spoiler-title]:not(.spoiler-processed):not(.hugo-spoiler)');
  console.log(`Found ${legacySpoilers.length} legacy spoiler elements`);
  
  legacySpoilers.forEach((spoiler, index) => {
    const spoilerElement = spoiler as HTMLElement;
    
    // Skip if this spoiler has already been processed
    if (spoilerElement.classList.contains('spoiler-processed')) {
      return;
    }
    
    // Mark as processed
    spoilerElement.classList.add('spoiler-processed');
    
    const title = spoilerElement.getAttribute('data-spoiler-title') || 'click to show';
    const content = spoilerElement.innerHTML;
    console.log(`Processing legacy spoiler ${index} with title: ${title}`);
    
    // Create the Hugo-style spoiler structure
    const spoilerDiv = document.createElement('div');
    spoilerDiv.className = 'spoiler panel panel-default';
    
    const spoilerBlock = document.createElement('div');
    spoilerBlock.className = 'spoiler_block';
    
    // Show link (initially visible)
    const showLink = document.createElement('a');
    showLink.href = '#';
    showLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-in spoiler_block_show';
    showLink.innerHTML = title; // Use innerHTML to preserve HTML formatting
    
    // Hide link (initially hidden)
    const hideLink = document.createElement('a');
    hideLink.href = '#';
    hideLink.className = 'spoiler-block-icon spoiler-block-icon-zoom-out spoiler_block_hide';
    hideLink.style.display = 'none';
    hideLink.textContent = 'click to hide';
    
    // Content div (initially hidden)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'spoiler_block_content';
    contentDiv.style.display = 'none';
    contentDiv.innerHTML = content;
    
    // Assemble the spoiler structure
    spoilerBlock.appendChild(showLink);
    spoilerBlock.appendChild(hideLink);
    spoilerBlock.appendChild(contentDiv);
    spoilerDiv.appendChild(spoilerBlock);
    
    // Replace the original element with our Hugo-style spoiler
    spoilerElement.parentNode?.replaceChild(spoilerDiv, spoilerElement);
  });
}

/**
 * Set up click handlers for spoiler blocks (Hugo style)
 */
function setupSpoilerClickHandlers(): void {
  // Define selectors for show/hide links and content
  const switchesSelector = '.spoiler_block_show,.spoiler_block_hide';
  const contentSelector = '.spoiler_block_content';
  
  // Add click event listeners to all spoiler switches
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Check if the clicked element is a spoiler switch or a child of a spoiler switch
    const clickedSwitch = target.matches(switchesSelector) ? 
      target : target.closest(switchesSelector);
    
    if (clickedSwitch) {
      event.preventDefault();
      
      // Find the parent spoiler block
      const spoilerBlock = clickedSwitch.closest('.spoiler_block');
      if (spoilerBlock) {
        // Toggle visibility of show/hide links and content
        const showHideLinks = spoilerBlock.querySelectorAll(switchesSelector);
        const contentDivs = spoilerBlock.querySelectorAll(contentSelector);
        
        showHideLinks.forEach(link => {
          (link as HTMLElement).style.display = 
            (link as HTMLElement).style.display === 'none' ? 'inline-block' : 'none';
        });
        
        contentDivs.forEach(div => {
          (div as HTMLElement).style.display = 
            (div as HTMLElement).style.display === 'none' ? 'block' : 'none';
        });
      }
    }
  });
}
