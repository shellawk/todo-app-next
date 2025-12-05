import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  const dbStatus = mongoose.connection.readyState;
  const statusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return NextResponse.json({
    message: 'Server is running!',
    database: statusText[dbStatus],
    timestamp: new Date().toISOString(),
  });
}