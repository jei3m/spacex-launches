# SpaceX Launches
![image](https://github.com/user-attachments/assets/7ae20eb0-ada8-4971-b63b-eb8845a5b7a7)

A responsive web application that displays SpaceX launch information with infinite scrolling and search functionality. Users can browse historical SpaceX launches, view detailed mission information, and access related articles/videos.

## Features

- **Mission Browsing**: View all SpaceX launches in chronological order
- **Search Functionality**: Filter launches by mission name
- **Infinite Scrolling**: Automatically loads more launches as you scroll
- **Detailed View**: Expandable cards with comprehensive launch details
- **Responsive Design**: Works on mobile and desktop devices
- **Real-time Status**: Clear indicators for successful/failed launches

## Technologies Used

- **Framework**: React (Vite)
- **UI Components**: Shadcn UI with Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback, useRef)
- **Infinite Scroll**: Intersection Observer API

## Installation

To set up the SpaceX Launches locally, follow these steps:

1. **Clone the Repository**
   
    ```shell
    git clone https://github.com/jei3m/spacex-launches.git
    cd spacex-launches
    ```

2. **Install Dependencies**
    
    ```shell
    npm install
    ```

3. **Start the Development Server**
    
    ```shell
    npm run dev
    ```

4. **Open Your Browser**
    
    Navigate to `http://localhost:5173` to view the application.

## Usage

- Use the search bar at the top to filter launches by mission name
- Scroll down to automatically load more launches
- Click "Mission Details" on any launch card to expand and view:
  - Launch status (successful/failed)
  - Rocket and payload information
  - Launch site details
  - Related articles and videos
- The loading spinner indicates when new launches are being fetched