/**
 * Bing and Google SEO Validator
 * 
 * This script validates your site's SEO configuration for both Bing and Google
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const siteUrl = 'https://steinum.dev';

// SEO validation checks
const seoChecks = {
  robots: {
    name: 'Robots.txt Validation',
    url: `${siteUrl}/robots.txt`,
    checks: [
      'Contains Bingbot user-agent',
      'Contains Googlebot user-agent', 
      'Has sitemap reference',
      'Allows crawling of main content'
    ]
  },
  sitemap: {
    name: 'Sitemap.xml Validation',
    url: `${siteUrl}/sitemap.xml`,
    checks: [
      'Valid XML format',
      'Contains homepage',
      'Contains blog posts',
      'Has proper lastmod dates',
      'Uses correct namespace'
    ]
  },
  homepage: {
    name: 'Homepage SEO',
    url: siteUrl,
    checks: [
      'Has title tag',
      'Has meta description',
      'Has structured data',
      'Has Open Graph tags',
      'Mobile-friendly viewport'
    ]
  }
};

// Function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

// Validate robots.txt
async function validateRobots() {
  console.log('\n🤖 Validating robots.txt...');
  
  try {
    const response = await makeRequest(seoChecks.robots.url);
    
    if (response.status !== 200) {
      console.log(`❌ robots.txt not accessible (Status: ${response.status})`);
      return false;
    }
    
    const content = response.data.toLowerCase();
    const checks = [
      { name: 'Bingbot user-agent', test: content.includes('bingbot') },
      { name: 'Googlebot user-agent', test: content.includes('googlebot') },
      { name: 'Sitemap reference', test: content.includes('sitemap:') },
      { name: 'Allows crawling', test: content.includes('allow: /') }
    ];
    
    checks.forEach(check => {
      console.log(`${check.test ? '✅' : '❌'} ${check.name}`);
    });
    
    return checks.every(check => check.test);
  } catch (error) {
    console.log(`❌ Error validating robots.txt: ${error.message}`);
    return false;
  }
}

// Validate sitemap.xml
async function validateSitemap() {
  console.log('\n🗺️  Validating sitemap.xml...');
  
  try {
    const response = await makeRequest(seoChecks.sitemap.url);
    
    if (response.status !== 200) {
      console.log(`❌ sitemap.xml not accessible (Status: ${response.status})`);
      return false;
    }
    
    const content = response.data;
    const checks = [
      { name: 'Valid XML format', test: content.startsWith('<?xml') },
      { name: 'Contains homepage', test: content.includes(`<loc>${siteUrl}/</loc>`) },
      { name: 'Contains blog posts', test: content.includes('/posts/') },
      { name: 'Has lastmod dates', test: content.includes('<lastmod>') },
      { name: 'Correct namespace', test: content.includes('schemas/sitemap/0.9') }
    ];
    
    checks.forEach(check => {
      console.log(`${check.test ? '✅' : '❌'} ${check.name}`);
    });
    
    return checks.every(check => check.test);
  } catch (error) {
    console.log(`❌ Error validating sitemap.xml: ${error.message}`);
    return false;
  }
}

// Validate homepage SEO
async function validateHomepage() {
  console.log('\n🏠 Validating homepage SEO...');
  
  try {
    const response = await makeRequest(seoChecks.homepage.url);
    
    if (response.status !== 200) {
      console.log(`❌ Homepage not accessible (Status: ${response.status})`);
      return false;
    }
    
    const content = response.data.toLowerCase();
    const checks = [
      { name: 'Title tag', test: content.includes('<title>') },
      { name: 'Meta description', test: content.includes('name="description"') },
      { name: 'Structured data', test: content.includes('application/ld+json') },
      { name: 'Open Graph tags', test: content.includes('property="og:') },
      { name: 'Mobile viewport', test: content.includes('name="viewport"') },
      { name: 'Bing verification', test: content.includes('msvalidate.01') },
      { name: 'Google verification', test: content.includes('google-site-verification') }
    ];
    
    checks.forEach(check => {
      console.log(`${check.test ? '✅' : '❌'} ${check.name}`);
    });
    
    return checks.every(check => check.test);
  } catch (error) {
    console.log(`❌ Error validating homepage: ${error.message}`);
    return false;
  }
}

// Main validation function
async function runSEOValidation() {
  console.log('🔍 Starting Bing and Google SEO Validation for steinum.dev\n');
  
  const results = {
    robots: await validateRobots(),
    sitemap: await validateSitemap(),
    homepage: await validateHomepage()
  };
  
  console.log('\n📊 Validation Summary:');
  console.log(`Robots.txt: ${results.robots ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Sitemap.xml: ${results.sitemap ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Homepage SEO: ${results.homepage ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  console.log(`\n${allPassed ? '🎉' : '⚠️'} Overall Status: ${allPassed ? 'READY FOR INDEXING' : 'NEEDS ATTENTION'}`);
  
  if (!allPassed) {
    console.log('\n📋 Next Steps:');
    console.log('1. Fix any failed checks above');
    console.log('2. Get verification codes from Google Search Console and Bing Webmaster Tools');
    console.log('3. Update _document.tsx with real verification codes');
    console.log('4. Deploy changes and re-run this validator');
    console.log('5. Submit sitemap to both search engines');
  } else {
    console.log('\n🚀 Your site is optimized for both Bing and Google!');
    console.log('Next steps:');
    console.log('1. Submit sitemap to Google Search Console');
    console.log('2. Submit sitemap to Bing Webmaster Tools');
    console.log('3. Request indexing of key pages');
  }
}

// Run the validation
runSEOValidation().catch(console.error);
