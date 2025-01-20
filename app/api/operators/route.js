import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Operator from '@/app/models/Operator';
import { getCurrentUser } from '@/app/lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const query = searchParams.get('query');

    let filter = {};
    if (city && city !== 'all') {
      filter.baseCity = city;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { baseCity: { $regex: query, $options: 'i' } },
      ];
    }

    const operators = await Operator.find(filter)
      .populate('user', 'name email')
      .select('-terminals.routes')
      .sort({ name: 1 });

    return NextResponse.json(operators);
  } catch (error) {
    console.error('Error fetching operators:', error);
    return NextResponse.json(
      { error: 'Error fetching operators' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'operator' && user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    // If the user is an operator, ensure they can only create their own operator profile
    if (user.role === 'operator') {
      data.user = user.id;
    }

    const operator = await Operator.create(data);
    return NextResponse.json(operator, { status: 201 });
  } catch (error) {
    console.error('Error creating operator:', error);
    return NextResponse.json(
      { error: 'Error creating operator' },
      { status: 500 }
    );
  }
}
