import React, { useState, useMemo, useEffect } from 'react';
import { Application, ApplicationStatus } from '../../types';
import { MoreHorizontal, Calendar, Building2, Search, Check, Circle, AlertCircle, FileEdit, Filter, ArrowUpDown, ListTodo, Plus, Trash2, CheckSquare, Square, ChevronDown, ChevronUp, Sparkles, Loader2, Heart, User } from 'lucide-react';
import { Button } from '../Button';

interface Props {
    applications: Application[];
    onViewImpact?: () => void;
}

const STEPS = [
    { id: ApplicationStatus.SUBMITTED, label: 'Submitted' },
    { id: ApplicationStatus.UNDER_REVIEW, label: 'Under Review' },
    { id: ApplicationStatus.INTERVIEW, label: 'Interview' },
    { id: ApplicationStatus.ACCEPTED, label: 'Offer' },
];

export const DashboardApplications: React.FC<Props> = ({ applications, onViewImpact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateSort, setDateSort] = useState<'newest' | 'oldest'>('newest');

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Filter by Search
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(app => 
            app.opportunity.title.toLowerCase().includes(q) ||
            app.opportunity.institution.toLowerCase().includes(q)
        );
    }

    // Filter by Status
    if (statusFilter !== 'All') {
        result = result.filter(app => app.status === statusFilter);
    }

    // Sort by Date (Mock logic: Assuming input is sorted newest first)
    if (dateSort === 'oldest') {
        result.reverse();
    }

    return result;
  }, [applications, searchQuery, statusFilter, dateSort]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-500">Track and manage your ongoing applications.</p>
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cliro-black w-full sm:w-48 lg:w-64 transition-shadow"
                />
            </div>

            <div className="flex gap-2">
                {/* Status Filter */}
                <div className="relative flex-1 sm:flex-none">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cliro-black appearance-none bg-white cursor-pointer w-full sm:w-auto transition-shadow"
                    >
                        <option value="All">All Status</option>
                        {Object.values(ApplicationStatus).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {/* Date Sort */}
                <div className="relative flex-1 sm:flex-none">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                        value={dateSort}
                        onChange={(e) => setDateSort(e.target.value as 'newest' | 'oldest')}
                        className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cliro-black appearance-none bg-white cursor-pointer w-full sm:w-auto transition-shadow"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            
                <Button variant="outline" size="sm" className="hidden xl:flex">Export</Button>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
            <ApplicationCard key={app.id} app={app} onViewImpact={onViewImpact} />
            ))
        ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-medium">No applications found</h3>
                <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
                <button 
                    onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                        setDateSort('newest');
                    }}
                    className="mt-4 text-sm font-semibold text-cliro-black hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

const ApplicationCard: React.FC<{ app: Application; onViewImpact?: () => void }> = ({ app, onViewImpact }) => {
    const isDraft = app.status === ApplicationStatus.DRAFT;
    const isRejected = app.status === ApplicationStatus.REJECTED;
    const currentStepIndex = STEPS.findIndex(s => s.id === app.status);

    const [showTasks, setShowTasks] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem(`cliro_tasks_${app.id}`);
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [app.id]);

    // Save tasks to localStorage
    useEffect(() => {
        if (tasks.length > 0 || localStorage.getItem(`cliro_tasks_${app.id}`)) {
             localStorage.setItem(`cliro_tasks_${app.id}`, JSON.stringify(tasks));
        }
    }, [tasks, app.id]);

    const addTask = () => {
        if (!newTask.trim()) return;
        const task: Task = {
            id: Date.now().toString(),
            text: newTask.trim(),
            completed: false
        };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (taskId: string) => {
        setTasks(tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };

    const generateAITasks = () => {
        setIsGenerating(true);
        // Simulate AI generation based on status
        setTimeout(() => {
            let suggestions: string[] = [];
            switch (app.status) {
                case ApplicationStatus.DRAFT:
                    suggestions = [
                        `Tailor CV for ${app.opportunity.title}`,
                        "Draft personal statement emphasizing clinical experience",
                        "Request transcript from registrar"
                    ];
                    break;
                case ApplicationStatus.SUBMITTED:
                case ApplicationStatus.UNDER_REVIEW:
                    suggestions = [
                        "Review application materials weekly",
                        `Research recent publications from ${app.opportunity.institution}`,
                        "Prepare portfolio of past work"
                    ];
                    break;
                case ApplicationStatus.INTERVIEW:
                    suggestions = [
                        "Schedule mock interview with mentor",
                        `Review "Why ${app.opportunity.institution}?" answer`,
                        "Prepare 3 questions for the interviewer",
                        "Check webcam and lighting setup"
                    ];
                    break;
                case ApplicationStatus.ACCEPTED:
                    suggestions = [
                        "Send acceptance email",
                        `Look for housing in ${app.opportunity.location.split(',')[0]}`,
                        "Review onboarding compliance requirements",
                        "Update immunizations record"
                    ];
                    break;
                default:
                    suggestions = ["Review other opportunities", "Update user profile"];
            }

            const newTasks = suggestions.map((text, i) => ({
                id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
                text,
                completed: false
            }));
            
            setTasks(prev => [...prev, ...newTasks]);
            setIsGenerating(false);
        }, 1500);
    };

    const pendingTasks = tasks.filter(t => !t.completed).length;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">
                
                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                            isDraft ? 'bg-gray-100 text-gray-600' :
                            isRejected ? 'bg-red-50 text-red-600' :
                            'bg-blue-50 text-blue-600'
                        }`}>
                            {app.status}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> Updated {app.lastUpdated}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{app.opportunity.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Building2 className="w-4 h-4 mr-1.5 text-gray-400" />
                        {app.opportunity.institution}
                        <span className="mx-2 text-gray-300">•</span>
                        {app.opportunity.location}
                    </div>

                    {/* Mentor Info */}
                    {app.opportunity.mentor && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                            <User className="w-4 h-4 mr-1.5 text-gray-400" />
                            <span className="text-gray-500 mr-1">Hosted by</span>
                            <span className="font-medium text-gray-900">{app.opportunity.mentor.name}</span>
                        </div>
                    )}

                    {/* Social Impact Badge */}
                    <div 
                        onClick={(e) => { e.stopPropagation(); onViewImpact?.(); }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit cursor-pointer hover:bg-red-100 transition-colors"
                        title="Click to view Foundation details"
                    >
                        <Heart className="w-3 h-3 fill-current" />
                        <span>Funded: Community Health Project</span>
                    </div>
                </div>

                {/* Status/Match Badge */}
                <div className="flex items-center gap-6">
                     <div className="text-right hidden sm:block">
                        <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Match Score</div>
                        <div className={`text-2xl font-bold ${app.matchScore >= 90 ? 'text-green-600' : 'text-gray-900'}`}>
                            {app.matchScore}%
                        </div>
                     </div>
                     <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                     <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                     </button>
                </div>
            </div>

            {/* Progress Visualization */}
            <div className="relative pt-2 pb-2 mb-6">
                {isDraft ? (
                    <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between border-2 border-dashed border-gray-200 gap-4">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <FileEdit className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <span className="font-bold text-gray-900 block">Application Draft In Progress</span>
                                <span className="text-sm text-gray-500">Last edited {app.lastUpdated}</span>
                            </div>
                         </div>
                         <Button size="sm" className="w-full sm:w-auto">Continue Application</Button>
                    </div>
                ) : isRejected ? (
                     <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3 border border-red-100 text-red-800">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <div>
                            <span className="font-bold text-sm block">Application Status: Closed</span>
                            <span className="text-xs opacity-80">This application was not selected for the next round.</span>
                        </div>
                    </div>
                ) : (
                    <div className="px-4">
                        <div className="relative flex items-center justify-between w-full">
                            {/* Connecting Line (Background) */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
                            
                            {/* Active Line (Foreground) */}
                            <div 
                                className="absolute top-1/2 left-0 h-1 bg-cliro-black -translate-y-1/2 z-0 transition-all duration-1000 rounded-full"
                                style={{ 
                                    width: `${(Math.max(0, currentStepIndex) / (STEPS.length - 1)) * 100}%` 
                                }}
                            ></div>

                            {/* Steps */}
                            {STEPS.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;

                                return (
                                    <div key={step.id} className="relative z-10 flex flex-col items-center group">
                                        <div 
                                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white shadow-sm ${
                                                isCompleted 
                                                    ? 'border-cliro-black text-cliro-black' 
                                                    : 'border-gray-200 text-gray-300'
                                            } ${isCurrent ? 'ring-4 ring-gray-100 scale-110' : ''}`}
                                        >
                                            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                                        </div>
                                        <span className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                                            isCompleted ? 'text-gray-900 font-bold' : 'text-gray-400'
                                        }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="h-8"></div>
                    </div>
                )}
            </div>
            
            {/* Checklist Section */}
            <div className="border-t border-gray-100 pt-4">
                <button 
                    onClick={() => setShowTasks(!showTasks)}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-cliro-black transition-colors"
                >
                    {showTasks ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                    <ListTodo className="w-4 h-4 mr-2" />
                    My Checklist {pendingTasks > 0 && <span className="ml-2 bg-cliro-black text-white text-[10px] px-2 py-0.5 rounded-full">{pendingTasks} Pending</span>}
                </button>
                
                {showTasks && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                                placeholder="Add a new task (e.g., Send follow-up email)..."
                                className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-cliro-black"
                            />
                            <Button size="sm" onClick={addTask} disabled={!newTask.trim()}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* AI Suggestions Button */}
                        <div className="flex justify-end mb-4">
                            <button 
                                onClick={generateAITasks}
                                disabled={isGenerating}
                                className="flex items-center text-xs font-semibold text-cliro-accent hover:text-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                                        Generating tasks...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-3 h-3 mr-1.5" />
                                        Auto-generate tasks for {app.status}
                                    </>
                                )}
                            </button>
                        </div>
                        
                        <div className="space-y-2">
                            {tasks.length === 0 ? (
                                <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-2">No tasks yet.</p>
                                    <p className="text-xs text-gray-400">Add one manually or ask AI to help.</p>
                                </div>
                            ) : (
                                tasks.map(task => (
                                    <div key={task.id} className="flex items-center group bg-white p-2 rounded border border-gray-100">
                                        <button 
                                            onClick={() => toggleTask(task.id)}
                                            className={`p-1 rounded mr-3 transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-500'}`}
                                        >
                                            {task.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                        </button>
                                        <span className={`flex-1 text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                            {task.text}
                                        </span>
                                        <button 
                                            onClick={() => deleteTask(task.id)}
                                            className="p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};