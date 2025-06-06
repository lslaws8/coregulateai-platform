export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'CoRegulateAI Dashboard API',
      status: 'operational',
      features: [
        'AI-Powered Coaching',
        'Wellness Analytics', 
        'HIPAA Compliant',
        'Personalized Experience'
      ]
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
