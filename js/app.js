import { WatermarkEngine } from './engine.js';

let engine = null;
let currentFile = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('App initializing...');
    
    // Initialize engine
    try {
        engine = await WatermarkEngine.create();
        console.log('Engine initialized successfully');
        window.setEngineReady(true);
    } catch (e) {
        console.error("Failed to load engine:", e);
        alert('资源加载失败，请确保网络连接正常后刷新页面');
    }
    
    // Listen for custom event from HTML
    window.addEventListener('startProcess', async (e) => {
        console.log('Received process event', e.detail);
        await processFile(e.detail);
    });
});

async function processFile(file) {
    if (!engine) {
        console.error('Engine not initialized');
        alert('引擎未初始化，请刷新页面');
        return;
    }
    
    if (!file) {
        console.error('No file provided');
        return;
    }
    
    console.log('Processing file:', file.name);
    
    try {
        const result = await engine.process(file);
        const resultUrl = URL.createObjectURL(result.blob);
        console.log('Processing complete', result);
        
        // Dispatch event to HTML
        window.dispatchEvent(new CustomEvent('processingComplete', {
            detail: {
                originalSrc: result.originalSrc,
                resultSrc: resultUrl,
                width: result.width,
                height: result.height,
                blob: result.blob
            }
        }));
    } catch (err) {
        console.error('Processing error:', err);
        document.getElementById('processing-overlay').classList.add('hidden');
        alert('处理失败: ' + err.message);
    }
}
