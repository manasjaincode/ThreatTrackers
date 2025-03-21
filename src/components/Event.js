import React from 'react';

function Events() {
  return (
    <main className="container mx-auto px-4 pt-32">
      <h2 className="text-5xl font-bold text-gray-400 mb-16">
        Upcoming Events-
      </h2>

      <div className="space-y-12">
        <div className="border-2 border-gray-800 rounded-lg p-8 bg-black/50">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-400 mb-2">&lt;/&gt; MoonHack 2025</h3>
              <p className="text-xl text-gray-500 mb-4">A 24-hour National Level Hackathon</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Date : 22 March 2025</p>
              <p className="text-yellow-500">⚠ Registrations Closed</p>
              <p className="text-gray-500">Venue : Medicaps University Indore</p>
              <p className="text-gray-500">Organised by Techno Clubs</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-800 rounded-lg p-8 bg-black/50">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-400 mb-2">Melange 2025</h3>
              <p className="text-xl text-gray-500 mb-4">Indore's Biggest Fashion show organized during Moonstone Fest</p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-500">Date : 28 March 2025</p>
              <p className="text-gray-500">Venue : Medicaps University Indore</p>
              <button className="px-6 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500/10 transition-colors">
                Apply for Participation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Events;