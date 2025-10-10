'use client';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';
export const socket = io(SOCKET_URL, { autoConnect: false });