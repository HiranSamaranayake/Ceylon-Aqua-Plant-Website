const http = require('http');

http.get('http://127.0.0.1:3000/', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('=== Checking Sticky Navbar HTML Structure ===');
    
    // Check sticky wrapper
    const hasStickyWrapper = html.includes('sticky top-0 z-50 w-full');
    console.log('Has sticky wrapper (sticky top-0 z-50 w-full):', hasStickyWrapper);
    
    // Check header with bg-[#EFF6FF]
    const hasHeaderBg = html.includes('bg-[#EFF6FF]');
    console.log('Has header with exact colour bg-[#EFF6FF]:', hasHeaderBg);
    
    // Check white background area below navbar
    const hasWhiteSeparation = html.includes('bg-white h-2.5 sm:h-3.5 border-b border-[#E5E7EB]');
    console.log('Has clean white background separation area below navbar:', hasWhiteSeparation);
    
    // Check navigation links
    const hasHome = html.includes('Home');
    const hasPlants = html.includes('Aquarium Plants');
    const hasGallery = html.includes('Gallery');
    const hasVideo = html.includes('Video');
    const hasAbout = html.includes('About');
    const hasContact = html.includes('Contact Us');
    console.log('Navigation items present:', { hasHome, hasPlants, hasGallery, hasVideo, hasAbout, hasContact });
    
    if (hasStickyWrapper && hasHeaderBg && hasWhiteSeparation && hasContact) {
      console.log('\n>>> ALL NAVBAR CHECKS PASSED SUCCESSFULLY! <<<');
      process.exit(0);
    } else {
      console.error('\n>>> SOME CHECKS FAILED! <<<');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
  process.exit(1);
});
