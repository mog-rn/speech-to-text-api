const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'subtle-proxy-415307', location: 'us-central1'});
const model = 'gemini-1.0-pro-vision-001';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generation_config: {
        "max_output_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 32
    },
    safety_settings: [
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
    ],
});

async function generateContent() {
    const req = {
        contents: [{role: 'user', parts: []}],
    };

    const streamingResp = await generativeModel.generateContentStream(req);

    for await (const item of streamingResp.stream) {
        process.stdout.write('stream chunk: ' + JSON.stringify(item));
    }

    process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
};

generateContent();