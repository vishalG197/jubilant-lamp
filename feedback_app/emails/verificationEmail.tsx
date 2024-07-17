import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ username, otp }) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', margin: 0, padding: 0 }}>
        <Container style={{ padding: '20px', maxWidth: '600px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Heading style={{ fontSize: '24px', color: '#333333' }}>Hello {username},</Heading>
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            Thank you for signing up. Please use the following OTP to verify your email address:
          </Text>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333' }}>{otp}</Text>
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            If you did not sign up for this account, please ignore this email.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            Best regards,<br />
            Your Company
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;
