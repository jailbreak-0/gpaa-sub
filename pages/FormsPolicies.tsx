import React from 'react';

const FormsPolicies: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-5xl font-black mb-8 text-primary">Forms & Policies</h1>
      <p className="mb-8 text-lg text-[#617289]">Browse and download official GPAA forms and policy documents. For questions, contact the Secretariat.</p>
      {/* TODO: List forms and policies here, or link to documents section if dynamic */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow p-6 border border-[#e5e7eb]">
          <h2 className="text-xl font-bold mb-2">Membership Application Form</h2>
          <a href="/documents/membership-application.pdf" className="text-primary font-bold hover:underline" download>Download PDF</a>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-[#e5e7eb]">
          <h2 className="text-xl font-bold mb-2">Code of Conduct</h2>
          <a href="/documents/code-of-conduct.pdf" className="text-primary font-bold hover:underline" download>Download PDF</a>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-[#e5e7eb]">
          <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
          <a href="/documents/privacy-policy.pdf" className="text-primary font-bold hover:underline" download>Download PDF</a>
        </div>
        {/* Add more forms/policies as needed */}
      </div>
    </div>
  );
};

export default FormsPolicies;
