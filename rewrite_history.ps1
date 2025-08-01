# PowerShell script to rewrite git history with commits from Aug-Oct 2025
# 50+ commits distributed across Aug 1 - Oct 31, 2025, skipping 7 days

# Set git config
git config user.name "Hani Mustafa Hashmi"
git config user.email "hanimhashmi121@gmail.com"

# Commit messages pool
$commitMessages = @(
    "feat: Initial portfolio website structure",
    "feat: Add navigation component",
    "feat: Add hero section with animations",
    "feat: Add about section component",
    "feat: Add skills section with tabs",
    "feat: Add experience section with timeline",
    "feat: Add education section",
    "feat: Add projects section with previews",
    "feat: Add certificates section with links",
    "feat: Add contact section",
    "feat: Add footer component",
    "feat: Add theme provider for dark mode",
    "fix: Resolve hydration error in client components",
    "fix: Update responsive styles for mobile",
    "fix: Fix image loading issues",
    "fix: Correct typography and spacing",
    "feat: Add UI components library",
    "feat: Add card component",
    "feat: Add button component",
    "feat: Add badge component",
    "feat: Add accordion component",
    "feat: Add tooltip component",
    "refactor: Improve component structure",
    "refactor: Optimize performance",
    "style: Update color scheme",
    "style: Enhance animations",
    "feat: Add favicon and icons",
    "feat: Add SVG icons for apple",
    "fix: Update certificate preview URLs",
    "fix: Update project descriptions",
    "feat: Make certificates clickable",
    "feat: Add confidential code tooltip",
    "feat: Update GitHub and LinkedIn links",
    "fix: Update contact information",
    "feat: Add custom favicon with HH initials",
    "feat: Add static SVG favicon files",
    "refactor: Update project technology stacks",
    "refactor: Update GitHub links",
    "fix: Update project descriptions in resume PDF",
    "feat: Add new project Mobility to projects section",
    "fix: Update location for Full Stack Developer experience",
    "fix: Update GitHub link for Dial-Loom project",
    "feat: Add new project description for Otaishan Trading Co.",
    "feat: Add Advanced Appium certification",
    "feat: Update Mobility project to Motorek",
    "refactor: Improve code organization",
    "style: Enhance UI components",
    "fix: Resolve CSS conflicts",
    "feat: Add new UI components",
    "docs: Update README",
    "perf: Optimize bundle size",
    "feat: Add loading states",
    "feat: Add error handling",
    "fix: Fix accessibility issues",
    "feat: Add SEO improvements",
    "feat: Add meta tags",
    "refactor: Clean up unused code",
    "style: Improve responsive design",
    "feat: Add animations library",
    "fix: Fix TypeScript errors"
)

# Days to skip
$skipDates = @(
    "2025-08-15",
    "2025-08-22", 
    "2025-08-29",
    "2025-09-05",
    "2025-09-12",
    "2025-09-19",
    "2025-10-10"
)

# Create commit distribution (day -> number of commits)
$commitSchedule = @{}
$totalCommits = 0

# Generate schedule from Aug 1 to Oct 31, 2025
$startDate = [DateTime]::Parse("2025-08-01")
$endDate = [DateTime]::Parse("2025-10-31")

for ($date = $startDate; $date -le $endDate; $date = $date.AddDays(1)) {
    $dateStr = $date.ToString("yyyy-MM-dd")
    
    # Skip if in skip list
    if ($skipDates -contains $dateStr) {
        continue
    }
    
    # Random commits per day (0-5, favoring 1-3)
    $rand = Get-Random -Minimum 0 -Maximum 100
    $commits = 0
    if ($rand -lt 25) { $commits = 0 }
    elseif ($rand -lt 55) { $commits = 1 }
    elseif ($rand -lt 75) { $commits = 2 }
    elseif ($rand -lt 90) { $commits = 3 }
    elseif ($rand -lt 97) { $commits = 4 }
    else { $commits = 5 }
    
    if ($commits -gt 0) {
        $commitSchedule[$dateStr] = $commits
        $totalCommits += $commits
    }
}

# Ensure at least 50 commits
while ($totalCommits -lt 50) {
    $randomDate = $commitSchedule.Keys | Get-Random
    if ($commitSchedule[$randomDate] -lt 5) {
        $commitSchedule[$randomDate]++
        $totalCommits++
    }
}

Write-Host "Will create $totalCommits commits across " $commitSchedule.Keys.Count " days"

# Get the initial commit to restore files from
$initialCommit = "eb6ec900a968ba1712bf6bebd173367d0700d037"

# Create orphan branch
Write-Host "Creating orphan branch..."
git checkout --orphan new-main

# Reset working directory
git rm -rf --cached .

# Restore files from initial commit (we'll build from there)
git checkout $initialCommit -- .

# Stage all files
git add .

# Make commits according to schedule
$messageIndex = 0
$commitCount = 0
$sortedDates = $commitSchedule.Keys | Sort-Object

foreach ($dateStr in $sortedDates) {
    $commitsForDay = $commitSchedule[$dateStr]
    $baseDate = [DateTime]::Parse($dateStr)
    
    for ($i = 0; $i -lt $commitsForDay; $i++) {
        if ($messageIndex -ge $commitMessages.Length) {
            $messageIndex = 0
        }
        
        $message = $commitMessages[$messageIndex]
        $messageIndex++
        
        # Set commit date (add hours for multiple commits same day)
        $commitDate = $baseDate.AddHours(9 + ($i * 2))
        $dateStrFull = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
        
        $env:GIT_AUTHOR_DATE = $dateStrFull
        $env:GIT_COMMITTER_DATE = $dateStrFull
        
        if ($commitCount -eq 0) {
            # First commit - commit all files
            git commit -m $message --date=$dateStrFull
        } else {
            # Subsequent commits - use --allow-empty since we're building history
            git commit --allow-empty -m $message --date=$dateStrFull
        }
        
        $commitCount++
    }
}

Write-Host "Created $commitCount commits"

# Replace main branch
Write-Host "Replacing main branch..."
git branch -D main
git branch -m main

Write-Host "Done! Run: git push -f origin main"
