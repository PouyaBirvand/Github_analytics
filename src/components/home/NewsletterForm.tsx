'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            if (email.includes('@')) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        }, 1000);
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return <Check className="w-4 h-4 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Mail className="w-4 h-4" />;
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'success':
                return 'Successfully subscribed!';
            case 'error':
                return 'Please enter a valid email';
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-12 p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 border border-border/50">
                <div className='space-y-4'>
                    <h3 className="text-xl font-bold">Stay Updated</h3>
                    <p className="text-muted-foreground">
                        Get notified about new features and GitHub analytics insights
                    </p>
                </div>
                <div className="relative flex-1 ">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={status === 'loading'}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {getStatusIcon()}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={status === 'loading' || !email.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </form>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: status === 'success' || status === 'error' ? 1 : 0,
                    height: status === 'success' || status === 'error' ? 'auto' : 0
                }}
                className="text-sm text-center"
            >
                {getStatusMessage()}
            </motion.div>
        </div>
    );
};
