const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api';

async function testCompleteWorkflow() {
  console.log('🧪 Starting JobCraft AI Complete Workflow Test\n');
  
  try {
    // Skip health check - server must be started manually
    console.log('⚠️ Make sure server is running: cd server && node server.js');
    console.log('⚠️ Server should be available at: http://localhost:5000\n');
    
    // Step 1: Start a job generation
    console.log('1️⃣ Starting job generation...');
    const jobPayload = {
      uploadId: 'test-upload-123',
      jobDescription: `Software Engineer Position at TechCorp
      
We are looking for a skilled Software Engineer to join our team. The ideal candidate will have:
- 3+ years of experience in JavaScript/Node.js
- Experience with React and modern web technologies
- Strong problem-solving skills
- Bachelor's degree in Computer Science or related field
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of databases and API development`,
      preferences: {
        includeReferences: true,
        tone: 'professional'
      }
    };
    
    const generateResponse = await axios.post(`${BASE_URL}/generate`, jobPayload);
    console.log('✅ Job started:', generateResponse.data);
    const jobId = generateResponse.data.jobId;
    
    // Step 2: Poll job status
    console.log('\n2️⃣ Polling job status...');
    let jobCompleted = false;
    let pollCount = 0;
    const maxPolls = 30; // 1 minute max
    
    while (!jobCompleted && pollCount < maxPolls) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      try {
        const statusResponse = await axios.get(`${BASE_URL}/generate/${jobId}/status`);
        const status = statusResponse.data;
        
        console.log(`   Poll ${pollCount + 1}: ${status.currentStep} (${status.progress}%) - Status: ${status.status}`);
        
        if (status.status === 'completed') {
          console.log('✅ Job completed successfully!');
          jobCompleted = true;
        } else if (status.status === 'failed') {
          console.log('❌ Job failed:', status.error);
          break;
        } else if (status.status === 'not_found') {
          console.log('⚠️ Job not found - this should not happen during active processing');
          break;
        }
        
        pollCount++;
      } catch (pollError) {
        console.error('❌ Polling error:', pollError.message);
        break;
      }
    }
    
    if (!jobCompleted) {
      console.log('⚠️ Job did not complete within expected time');
      return;
    }
    
    // Step 3: Test download functionality
    console.log('\n3️⃣ Testing download functionality...');
    
    try {
      const downloadResponse = await axios.get(`${BASE_URL}/download/${jobId}`);
      console.log('✅ Download links retrieved:', downloadResponse.data);
      
      // Test package download
      console.log('\n   Testing package download...');
      const packageResponse = await axios.get(`${BASE_URL}/download/${jobId}?format=package`, {
        responseType: 'stream'
      });
      
      if (packageResponse.status === 200) {
        console.log('✅ Package download successful');
        
        // Save package for verification
        const packagePath = path.join(__dirname, 'test-downloads', `${jobId}_package.zip`);
        await fs.ensureDir(path.dirname(packagePath));
        
        const writer = fs.createWriteStream(packagePath);
        packageResponse.data.pipe(writer);
        
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        
        const stats = await fs.stat(packagePath);
        console.log(`   Package saved: ${packagePath} (${stats.size} bytes)`);
      }
      
      // Test individual document downloads
      const downloadLinks = downloadResponse.data.downloadLinks;
      if (downloadLinks) {
        for (const [docType, link] of Object.entries(downloadLinks)) {
          console.log(`\n   Testing ${docType} download...`);
          try {
            const docResponse = await axios.get(`${BASE_URL}/download/${jobId}/${docType}`, {
              responseType: 'stream'
            });
            
            if (docResponse.status === 200) {
              console.log(`✅ ${docType} download successful`);
            }
          } catch (docError) {
            console.error(`❌ ${docType} download failed:`, docError.message);
          }
        }
      }
      
    } catch (downloadError) {
      console.error('❌ Download test failed:', downloadError.message);
    }
    
    // Step 4: Test analysis download
    console.log('\n4️⃣ Testing analysis download...');
    try {
      const analysisResponse = await axios.get(`${BASE_URL}/download/${jobId}/analysis`);
      console.log('✅ Analysis download successful');
      console.log('   Analysis data:', JSON.stringify(analysisResponse.data, null, 2));
    } catch (analysisError) {
      console.error('❌ Analysis download failed:', analysisError.message);
    }
    
    // Step 5: Test job status after completion
    console.log('\n5️⃣ Testing job status after completion...');
    try {
      const finalStatusResponse = await axios.get(`${BASE_URL}/generate/${jobId}/status`);
      console.log('✅ Final status check successful:', finalStatusResponse.data.status);
    } catch (statusError) {
      console.error('❌ Final status check failed:', statusError.message);
    }
    
    // Step 6: Test non-existent job (should not return 404)
    console.log('\n6️⃣ Testing non-existent job handling...');
    try {
      const fakeJobId = 'fake-job-id-12345';
      const fakeStatusResponse = await axios.get(`${BASE_URL}/generate/${fakeJobId}/status`);
      
      if (fakeStatusResponse.status === 200 && fakeStatusResponse.data.status === 'not_found') {
        console.log('✅ Non-existent job handled correctly (no 404)');
      } else {
        console.log('⚠️ Unexpected response for non-existent job:', fakeStatusResponse.data);
      }
    } catch (fakeJobError) {
      console.error('❌ Non-existent job test failed:', fakeJobError.message);
    }
    
    console.log('\n🎉 Complete workflow test finished!');
    
  } catch (error) {
    console.error('💥 Workflow test failed:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
  }
}

// Run the test
if (require.main === module) {
  testCompleteWorkflow().catch(console.error);
}

module.exports = { testCompleteWorkflow };
