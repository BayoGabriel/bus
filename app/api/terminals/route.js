import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Terminal from '@/app/models/Terminal';
import { getCurrentUser } from '@/app/lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const query = searchParams.get('query');

    let filter = {};
    if (city && city !== 'all') {
      filter.city = city;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
      ];
    }

    const terminals = await Terminal.find(filter)
      .populate('operators', 'name logo rating')
      .sort({ name: 1 });

    return NextResponse.json(terminals);
  } catch (error) {
    console.error('Error fetching terminals:', error);
    return NextResponse.json(
      { error: 'Error fetching terminals' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    const terminal = await Terminal.create(data);
    return NextResponse.json(terminal, { status: 201 });
  } catch (error) {
    console.error('Error creating terminal:', error);
    return NextResponse.json(
      { error: 'Error creating terminal' },
      { status: 500 }
    );
  }
}
