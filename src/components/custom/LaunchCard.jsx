import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LaunchCard = ({ launch }) => {
  const launchDate = new Date(launch.launch_date_utc).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  function capitalizeText(text) {
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  return (
    <Card className="transition-shadow duration-300">
      <CardContent className="flex flex-col gap-y-1">

        <div className="flex">
          {launch.links?.mission_patch && (
            <div className="mr-4 flex-shrink-0">
              <img 
                src={launch.links.mission_patch} 
                alt={`${launch.mission_name} patch`}
                className="h-24 w-24 object-contain"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">{launch.mission_name}</h2>
              <span className={`mt-[2px] flex items-center h-[24px] ml-2 px-2 rounded-xl font-semibold text-sm ${launch.launch_success ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-600'}`}>
                {launch.launch_success ? 'Successful' : 'Failed'}
              </span>
            </div>

            <div className="space-y-1 mt-2">
              <p className="text-gray-600 text-md"><span className="font-medium">Flight Number:</span> {launch.flight_number}</p>
              <p className="text-gray-600 text-md"><span className="font-medium">Launch Date:</span> {launchDate}</p>
              <p className="text-gray-600 text-md"><span className="font-medium">Launch Year:</span> {launch.launch_year}</p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="details">
            <AccordionTrigger className="pt-4 text-md text-blue-600">Mission Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-[16px] text-gray-600">
                <p className="font-medium">
                  {launch.details}
                  {launch.launch_failure_details && (
                    <span className="text-destructive block mt-2">
                      Failure at {launch.launch_failure_details.time}s: {capitalizeText(launch.launch_failure_details.reason)}
                    </span>
                  )}
                </p>
                <p><span className="font-semibold">Launch Site:</span> {launch.launch_site?.site_name_long}</p>
                <p><span className="font-semibold">Rocket:</span> {launch.rocket?.rocket_name} ({launch.rocket?.rocket_type})</p>
                <p><span className="font-semibold">Payload:</span> {launch.rocket?.second_stage?.payloads[0]?.payload_id}</p>
                <p><span className="font-semibold">Orbit:</span> {launch.rocket?.second_stage?.payloads[0]?.orbit}</p>
                <p><span className="font-semibold">Customer:</span> {launch.rocket?.second_stage?.payloads[0]?.customers.join(', ')}</p>
                
                <div className="flex gap-4 mt-4 font-medium">
                  {launch.links?.article_link && (
                    <a className="text-blue-600 hover:underline" href={launch.links.article_link} target="_blank" rel="noopener noreferrer">
                      Read Article
                    </a>
                  )}
                  {launch.links?.video_link && (
                    <a className="text-blue-600 hover:underline" href={launch.links.video_link} target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </a>
                  )}
                  {launch.links?.wikipedia && (
                    <a className="text-blue-600 hover:underline" href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                      Wikipedia
                    </a>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
      </CardContent>
    </Card>
  );
};

export default LaunchCard;