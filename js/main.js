import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nonbtfqhdlniakdnmcqw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbmJ0ZnFoZGxuaWFrZG5tY3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjQ3NjQsImV4cCI6MjA2NDM0MDc2NH0.zXYLJn8cMhfngQEFCvitRv5bEkCNWsGCNKMn1PQ3ElA'
const supabase = createClient(supabaseUrl, supabaseKey)
const searchInput = document.querySelector('.search-container input');

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();

    if (query.length > 2) {
        const { data, error } = await supabase
            .from('uk')
            .select('*')
            .ilike('title', `%${query}%`)

        if (error) {
            console.error('Search error:', error.message);
            return;
        }

        console.log('Search results:', data);
        displayResults(data);
    }
});

function displayResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.title;
        resultsContainer.appendChild(div);
    });
}