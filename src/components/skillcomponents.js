import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";

const SkillComponents = ({ selectedItems, setSelectedItems }) => {
  const searchList = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Rust",
    "SQL",
    "Dart",
    "R",
    "Scala",
    "Perl",
    "Lua",
    "Haskell",
    "Elixir",
    "React",
    "Angular",
    "Vue.js",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Preact",
    "Alpine.js",
    "LitElement",
    "Ember.js",
    "Solid.js",
    "Mithril",
    "Node.js",
    "Express.js",
    "NestJS",
    "Koa",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "Ruby on Rails",
    "Laravel",
    "ASP.NET",
    "Gin",
    "Fiber",
    "Phoenix",
    "Actix",
    "Rocket",
    "React Native",
    "Flutter",
    "SwiftUI",
    "Jetpack Compose",
    "Xamarin",
    "Ionic",
    "Cordova",
    "Tailwind CSS",
    "Material-UI (MUI)",
    "Bootstrap",
    "Bulma",
    "Chakra UI",
    "Ant Design",
    "Foundation",
    "Semantic UI",
    "Styled Components",
    "Emotion",
    "Sass",
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Prisma",
    "TypeORM",
    "Sequelize",
    "SQLAlchemy",
    "Doctrine",
    "Jest",
    "Mocha",
    "Chai",
    "Cypress",
    "Selenium",
    "Puppeteer",
    "Testing Library",
    "Playwright",
    "JUnit",
    "PyTest",
    "RSpec",
    "Redux",
    "Zustand",
    "MobX",
    "Recoil",
    "Context API",
    "Effector",
    "Vuex",
    "Pinia",
    "NgRx",
    "Axios",
    "Fetch API",
    "Apollo Client",
    "Relay",
    "GraphQL.js",
    "SWR",
    "React Query",
    "Retrofit",
    "gRPC",
    "Passport.js",
    "JWT",
    "Firebase Authentication",
    "Auth0",
    "OAuth",
    "NextAuth.js",
    "Amazon Cognito",
    "Devise",
    "Keycloak",
    "Zod",
    "Joi",
    "Yup",
    "Validator.js",
    "class-validator",
    "Formik",
    "Webpack",
    "Parcel",
    "Vite",
    "Rollup",
    "Gulp",
    "Grunt",
    "npm",
    "Yarn",
    "pnpm",
    "Composer",
    "Pip",
    "AWS Lambda",
    "Azure Functions",
    "Google Cloud Functions",
    "Serverless Framework",
    "Firebase Functions",
    "Docker",
    "Kubernetes",
    "Heroku",
    "Vercel",
    "Netlify",
    "Amazon ECS",
    "Azure App Service",
  ];

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSelect = (item) => {
    if (!selectedItems?.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setOpen(false);
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems?.filter((i) => i !== item));
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm]);

  return (
    <div className="">
      <div className="flex items-center gap-4 w-full">
        <Label className="md:w-40 block text-sm font-medium text-gray-700">
          Skill
        </Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="md:w-[400px] p-2 w-[300px] border min-h-10 flex justify-between items-center rounded-md"
            >
              {selectedItems.length > 0 ? (
                <>
                  <div className="md:grid-cols-3 grid-cols-2 gap-2 grid">
                    {selectedItems?.map((item) => (
                      <div
                        key={item}
                        className="justify-between gap-2 w-auto bg-emerald-600 flex items-center px-2 py-1 rounded-full"
                      >
                        <span className="text-xs font-semibold text-white">
                          {item}
                        </span>
                        <button onClick={() => handleRemove(item)}>
                          <BsXCircle
                            size={16}
                            className="text-white hover:text-red-500 font-bold"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cursor-pointer w-10 border-l-2 flex justify-center items-center">
                    <FaChevronDown />
                  </div>
                </>
              ) : (
                <div className="text-xs">Add Skill</div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="md:w-[400px] w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No batch found.</CommandEmpty>
                <CommandGroup>
                  {searchList
                    .filter((batch) => batch.includes(searchTerm))
                    .map((batch) => (
                      <CommandItem
                        key={batch}
                        onSelect={() => handleSelect(batch)}
                      >
                        {batch}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedItems.includes(batch)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SkillComponents;
