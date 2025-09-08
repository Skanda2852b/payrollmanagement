import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Salary from '@/lib/models/Salary';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let salaryData;
    if (user.role === 'admin') {
      salaryData = await Salary.find()
        .populate('employeeId', 'name email')
        .populate('generatedBy', 'name');
    } else {
      salaryData = await Salary.find({ employeeId: user._id }).populate(
        'generatedBy',
        'name'
      );
    }

    return NextResponse.json({ salaryData });
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

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const {
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      bonus,
    } = await request.json();

    const totalAmount = basicSalary + allowances + bonus - deductions;

    const salary = await Salary.create({
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      bonus,
      totalAmount,
      generatedBy: user._id,
    });

    return NextResponse.json(
      { message: 'Salary slip generated successfully', salary },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}