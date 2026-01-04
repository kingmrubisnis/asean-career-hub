import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, ExternalLink, Menu, X, ChevronRight, TrendingUp, Users, Building2, Code, Heart, Cpu, BookOpen, Utensils, Truck, Filter } from 'lucide-react';

const ADZUNA_APP_ID = '6ff04141';
const ADZUNA_APP_KEY = '9a226ed338b9caa981f3b36bf1d879ea';

const COUNTRIES = [
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
];

const JOB_CATEGORIES = [
  { id: 'all', name: 'All Jobs', icon: Briefcase, query: '' },
  { id: 'it', name: 'IT & Software', icon: Code, query: 'software developer engineer' },
  { id: 'sales', name: 'Sales & Marketing', icon: TrendingUp, query: 'sales marketing' },
  { id: 'finance', name: 'Finance & Accounting', icon: DollarSign, query: 'finance accounting' },
  { id: 'hr', name: 'Human Resources', icon: Users, query: 'human resources hr' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: Heart, query: 'healthcare medical nurse doctor' },
  { id: 'engineering', name: 'Engineering', icon: Cpu, query: 'engineer engineering' },
  { id: 'education', name: 'Education & Training', icon: BookOpen, query: 'teacher education training' },
  { id: 'hospitality', name: 'Hospitality & Tourism', icon: Utensils, query: 'hotel hospitality tourism' },
  { id: 'logistics', name: 'Logistics & Supply Chain', icon: Truck, query: 'logistics supply chain' },
  { id: 'admin', name: 'Admin & Office', icon: Building2, query: 'admin office assistant' },
  { id: 'customer', name: 'Customer Service', icon: Users, query: 'customer service support' },
  { id: 'design', name: 'Design & Creative', icon: Briefcase, query: 'designer creative graphic' },
];

export default function JobBlog() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('sg');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const fetchJobs = async (page = 1, search = '', country = 'sg', category = 'all') => {
    setLoading(true);
    try {
      const categoryObj = JOB_CATEGORIES.find(cat => cat.id === category);
      const query = search || categoryObj?.query || 'developer';
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=${encodeURIComponent(query)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setJobs(data.results || []);
      setTotalResults(data.count || 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(currentPage, searchTerm, selectedCountry, selectedCategory);
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchJobs(1, searchTerm, selectedCountry, selectedCategory);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    fetchJobs(1, searchTerm, country, selectedCategory);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setShowCategories(false);
    fetchJobs(1, searchTerm, selectedCountry, categoryId);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Competitive Salary';
    if (min && max) return `$${Math.round(min).toLocaleString()} - $${Math.round(max).toLocaleString()}`;
    if (min) return `From $${Math.round(min).toLocaleString()}`;
    return `Up to $${Math.round(max).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  const currentCategoryObj = JOB_CATEGORIES.find(cat => cat.id === selectedCategory);
  const CategoryIcon = currentCategoryObj?.icon || Briefcase;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#e9523d] to-[#d43d28] p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">ASEAN Career Hub</h1>
                <p className="text-xs text-gray-500">Your Gateway to Southeast Asia Jobs</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => handleCategoryChange('all')} className="text-gray-700 hover:text-[#e9523d] font-medium transition-colors">
                Home
              </button>
              <button onClick={() => setShowCategories(!showCategories)} className="text-gray-700 hover:text-[#e9523d] font-medium transition-colors flex items-center gap-1">
                Categories
                <ChevronRight className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-90' : ''}`} />
              </button>
              <a href="#about" className="text-gray-700 hover:text-[#e9523d] font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#e9523d] font-medium transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => { handleCategoryChange('all'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Home
              </button>
              <button onClick={() => setShowCategories(!showCategories)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Categories
              </button>
              <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">About</a>
              <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#e9523d] to-[#d43d28] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Discover Your Dream Career in Southeast Asia</h2>
            <p className="text-lg opacity-90">Explore {totalResults.toLocaleString()}+ opportunities across ASEAN countries</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Job title, keywords, or company..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e9523d] focus:border-transparent text-gray-800"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-[#e9523d] hover:bg-[#d43d28] rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-white"
                >
                  Search Jobs
                </button>
              </div>

              {/* Country Filter */}
              <div className="flex flex-wrap gap-2 mt-4">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCountry === country.code
                        ? 'bg-[#e9523d] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Dropdown */}
      {showCategories && (
        <div className="bg-white border-b border-gray-200 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#e9523d]" />
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {JOB_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-[#e9523d] text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-medium text-center">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Current Category */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#e9523d]">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CategoryIcon className="w-5 h-5 text-[#e9523d]" />
                Current Filter
              </h3>
              <p className="text-sm text-gray-600">{currentCategoryObj?.name || 'All Jobs'}</p>
              <p className="text-xs text-gray-500 mt-2">{totalResults.toLocaleString()} jobs found</p>
            </div>

            {/* Quick Categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {JOB_CATEGORIES.slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-[#e9523d] hover:text-white transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* AdSense - Sidebar */}
            <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <div className="h-64 flex items-center justify-center bg-white rounded">
                <span className="text-xs text-gray-400">[300x250 Ad Unit]</span>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* AdSense - Top Banner */}
            <div className="bg-gray-100 rounded-xl p-4 text-center mb-6 border border-gray-200">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <div className="h-24 flex items-center justify-center bg-white rounded">
                <span className="text-xs text-gray-400">[728x90 Leaderboard]</span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#e9523d]"></div>
              </div>
            ) : (
              <>
                {jobs.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">No jobs found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobs.map((job, index) => (
                      <article
                        key={job.id || index}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#e9523d]"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#e9523d] transition-colors">
                                {job.title}
                              </h2>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4 text-[#e9523d]" />
                                  <span className="font-medium">{job.company.display_name}</span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-[#e9523d]" />
                                  <span>{job.location.display_name}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-[#e9523d] font-medium">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-500">{formatDate(job.created)}</span>
                                </div>
                              </div>
                            </div>

                            <a
                              href={job.redirect_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e9523d] to-[#d43d28] hover:from-[#d43d28] hover:to-[#c32d18] text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                            >
                              Apply
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {job.description.replace(/<[^>]*>/g, '').substring(0, 300)}...
                          </p>

                          {job.category && (
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-[#e9523d]/10 text-[#e9523d] rounded-full text-xs font-medium border border-[#e9523d]/20">
                                {job.category.label}
                              </span>
                              {job.contract_time && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                  {job.contract_time}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* AdSense - Mid Content */}
                {jobs.length > 10 && (
                  <div className="bg-gray-100 rounded-xl p-4 text-center my-6 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                    <div className="h-24 flex items-center justify-center bg-white rounded">
                      <span className="text-xs text-gray-400">[728x90 Leaderboard]</span>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {jobs.length > 0 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      onClick={() => {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        fetchJobs(newPage, searchTerm, selectedCountry, selectedCategory);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-[#e9523d] disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 text-gray-700"
                    >
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 bg-[#e9523d] text-white rounded-lg font-medium">
                      Page {currentPage}
                    </span>
                    
                    <button
                      onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        fetchJobs(newPage, searchTerm, selectedCountry, selectedCategory);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={jobs.length < 20}
                      className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-[#e9523d] disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-gray-700"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#e9523d]">About Us</h3>
              <p className="text-gray-400 text-sm">Your trusted partner in finding career opportunities across Southeast Asia.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#e9523d]">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white">Contact Us</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#e9523d]">Countries</h3>
              <div className="space-y-2 text-sm">
                {COUNTRIES.map(c => (
                  <button key={c.code} onClick={() => handleCountryChange(c.code)} className="block text-gray-400 hover:text-white">
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#e9523d]">Categories</h3>
              <div className="space-y-2 text-sm">
                {JOB_CATEGORIES.slice(1, 6).map(cat => (
                  <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className="block text-gray-400 hover:text-white">
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 ASEAN Career Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
