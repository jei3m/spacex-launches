import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LaunchCard from './components/custom/LaunchCard';

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const contentRef = useRef(null);
  const observer = useRef();

  const filteredLaunches = launches.filter(launch =>
    launch.mission_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const fetchLaunches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches`, 
        {
          params: {
            limit: 10,
            offset: (page - 1) * 10
          }
        }
      );
      const sortedData = [...response.data].sort((a, b) => b.launch_year.localeCompare(a.launch_year));
      setLaunches(prev => [...prev, ...sortedData]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching launches:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const lastLaunchElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchLaunches();
  }, [page]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">SpaceX Launches</h1>
        
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 border border-gray-400"
          />
        </div>
        
        <div ref={contentRef} className="space-y-4">
          {filteredLaunches.map((launch, index) => {
            const isLastElement = index === filteredLaunches.length - 1;
            return (
              <div 
                key={`${launch.flight_number}-${index}`}
                ref={isLastElement ? lastLaunchElementRef : null}
              >
                <LaunchCard launch={launch} />
              </div>
            );
          })}
        </div>
        
        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        )}
        
        {!hasMore && !loading && (
          <div className="text-center py-6 text-gray-500">
            No more launches to load
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;