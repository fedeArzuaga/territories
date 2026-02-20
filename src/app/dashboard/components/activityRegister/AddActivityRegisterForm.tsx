import { useState, useTransition } from "react";
import { FaCalendarAlt, FaUser, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { Spinner } from "@/components/ui/Spinner/Spinner";

export const AddActivityRegisterForm = () => {

    //? TODO: Implement custom hook to make the component cleaner than already

    //! FUNCTIONALITY NOT ALLOWED TO BE IMPLEMENTED AT THE MOMENT (20/02/2026) 

    const [isPending, startTransition] = useTransition();
    const [isCompleted, setIsCompleted] = useState(false);
    
    const [form, setForm] = useState({
        lastLeaderName: '',
        started: new Date().toISOString().split('T')[0],
        finished: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleCompleted = () => {
        setIsCompleted(!isCompleted);
        if (!isCompleted && !form.finished) {
            setForm(prev => ({ ...prev, finished: new Date().toISOString().split('T')[0] }));
        }
    };

    // Date Validation
    const isDateError = form.finished && new Date(form.started) > new Date(form.finished);
    const isSubmitDisabled = !form.lastLeaderName || !form.started || isDateError || isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        startTransition(async () => {
            console.log( form )
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
            <div className="space-y-4">
                {/* Leader Name Field */}
                <div className="flex flex-col space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <FaUser className="text-teal-600" /> Último conductor *
                    </label>
                    <input
                        type="text"
                        name="lastLeaderName"
                        value={form.lastLeaderName}
                        onChange={handleInputChange}
                        placeholder="Nombre del hermano"
                        className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-gray-700"
                        required
                    />
                </div>

                {/* Completion Toggle (Checkbox Replacement) */}
                <div 
                    onClick={toggleCompleted}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isCompleted 
                        ? "border-teal-600 bg-teal-50 shadow-sm" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                    <div className="flex flex-col">
                        <span className={`text-sm font-bold ${isCompleted ? "text-teal-800" : "text-gray-600"}`}>
                            {isCompleted ? "Marcado como completado" : "¿Está completado?"}
                        </span>
                    </div>
                    {isCompleted ? (
                        <FaCheckCircle className="text-teal-600" size={24} />
                    ) : (
                        <FaRegCircle className="text-gray-300" size={24} />
                    )}
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <FaCalendarAlt className="text-teal-600" /> Fecha Inicio *
                        </label>
                        <input
                            type="date"
                            name="started"
                            value={form.started}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-gray-700"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <FaCalendarAlt className={isCompleted ? "text-teal-600" : "text-gray-300"} /> Fecha Fin
                        </label>
                        <input
                            type="date"
                            name="finished"
                            disabled={!isCompleted}
                            value={form.finished}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-xl outline-none transition-all font-bold ${
                                isCompleted 
                                ? "bg-gray-50 focus:ring-2 focus:ring-teal-500 text-gray-700" 
                                : "bg-gray-200 text-gray-400 cursor-not-allowed border-transparent"
                            }`}
                        />
                        {/* Date Error Message */}
                        {isDateError && (
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-tighter italic">
                                * La fecha de inicio no puede ser posterior a la de fin.
                            </p>
                        )}
                    </div>
                </div>

            </div>

            {/* Submit Button */}
            <div className="">
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                        isSubmitDisabled 
                        ? "bg-gray-300 shadow-none cursor-not-allowed" 
                        : "bg-teal-600 hover:bg-teal-700 hover:-translate-y-1 active:scale-95 shadow-teal-100"
                    }`}
                >
                    {isPending ? (
                        <><Spinner /> Guardando...</>
                    ) : (
                        <><IoIosSave size={20} /> Guardar Registro</>
                    )}
                </button>
            </div>
        </form>
    );
};