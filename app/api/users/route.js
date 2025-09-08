import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    const user = await verifyToken(token);

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only get employees, not admins
    const users = await User.find({ role: 'employee' }).select('-password');
    
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    const user = await verifyToken(token);

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId, salary } = await request.json();

    if (!userId || salary === undefined) {
      return NextResponse.json(
        { message: 'User ID and salary are required' },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { salary },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User salary updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}