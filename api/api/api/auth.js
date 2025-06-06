export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      authenticated: true,
      user: {
        id: 'demo-user',
        username: 'CoRegulateAI User',
        firstName: 'Demo',
        role: 'user'
      }
    });
  } else if (req.method === 'POST') {
    res.status(200).json({
      success: true,
      message: 'Authentication successful'
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
