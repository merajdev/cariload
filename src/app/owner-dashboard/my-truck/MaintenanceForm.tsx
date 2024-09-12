import { useState } from "react";

export const MaintenanceForm = ({  maintenance, onSubmit, onCancel }: {
    maintenance: {
        lastMaintenance: Date;
        nextMaintenance: Date;
        recentRepairs?: string;
    } | null;
    onSubmit: (maintenance: {
        lastMaintenance: Date;
        nextMaintenance: Date;
        recentRepairs?: string;
    }) => void;
    onCancel: () => void;
}) => {
    const [lastMaintenance, setLastMaintenance] = useState<string>(maintenance?.lastMaintenance.toISOString().split('T')[0] || '');
    const [nextMaintenance, setNextMaintenance] = useState<string>(maintenance?.nextMaintenance.toISOString().split('T')[0] || '');
    const [recentRepairs, setRecentRepairs] = useState<string>(maintenance?.recentRepairs || '');

    const handleSubmit = () => {
        if (!lastMaintenance || !nextMaintenance) return;

        onSubmit({
            lastMaintenance: new Date(lastMaintenance),
            nextMaintenance: new Date(nextMaintenance),
            recentRepairs,
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white mx-4 p-3 md:p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Last Maintenance</label>
                        <input
                            type="date"
                            value={lastMaintenance}
                            onChange={(e) => setLastMaintenance(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Next Maintenance</label>
                        <input
                            type="date"
                            value={nextMaintenance}
                            onChange={(e) => setNextMaintenance(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Recent Repairs</label>
                        <textarea
                            value={recentRepairs}
                            onChange={(e) => setRecentRepairs(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </form>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};