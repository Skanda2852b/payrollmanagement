import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Expense from '@/lib/models/Expense';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let expenses;
    if (user.role === 'admin') {
      expenses = await Expense.find().populate('employeeId', 'name email');
    } else {
      expenses = await Expense.find({ employeeId: user._id });
    }

    return NextResponse.json({ expenses });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'employee') {
      return NextResponse.json(
        { message: 'Only employees can submit expenses' },
        { status: 403 }
      );
    }

    const { month, year, category, amount, description } = await request.json();

    const expense = await Expense.create({
      employeeId: user._id,
      month,
      year,
      category,
      amount,
      description,
    });

    return NextResponse.json(
      { message: 'Expense submitted successfully', expense },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}