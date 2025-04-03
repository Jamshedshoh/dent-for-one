import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../Layout";

export const Planner = () => {
  const [weeklyPlan, setWeeklyPlan] = useState({});
  const [completionRate, setCompletionRate] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const location = useLocation();

  // Sample initial activities
  const sampleActivities = [
    {
      id: 1,
      name: "Brushing Teeth",
      days: ["Monday", "Wednesday", "Friday"],
      time: "Morning",
      completed: false,
      programId: null,
    },
    {
      id: 2,
      name: "Flossing",
      days: ["Tuesday", "Thursday"],
      time: "Evening",
      completed: false,
      programId: null,
    },
  ];

  useEffect(() => {
    // Initialize with sample data
    setActivities(sampleActivities);

    // Check for new program added from Programs page
    if (location.state?.newProgram) {
      addProgramActivities(location.state.newProgram);
    }

    // Calculate initial completion rate
    calculateCompletionRate(sampleActivities);
  }, [location.state]);

  useEffect(() => {
    // Update completion rate when activities change
    calculateCompletionRate(activities);
  }, [activities]);

  const addProgramActivities = (program) => {
    let newActivities = [];

    // Different programs would add different activities
    switch (program.title) {
      case "Daily Brushing Routine":
        newActivities = [
          {
            id: Date.now(),
            name: "Brushing Technique Practice",
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            time: "Morning",
            completed: false,
            programId: program.id,
          },
          {
            id: Date.now() + 1,
            name: "Brushing Timer Exercise",
            days: ["Saturday", "Sunday"],
            time: "Evening",
            completed: false,
            programId: program.id,
          },
        ];
        break;
      case "Flossing Mastery":
        newActivities = [
          {
            id: Date.now(),
            name: "Flossing Technique Practice",
            days: ["Monday", "Wednesday", "Friday"],
            time: "Evening",
            completed: false,
            programId: program.id,
          },
        ];
        break;
      case "Nutrition for Teeth":
        newActivities = [
          {
            id: Date.now(),
            name: "Food Diary Tracking",
            days: ["Tuesday", "Thursday"],
            time: "After meals",
            completed: false,
            programId: program.id,
          },
          {
            id: Date.now() + 1,
            name: "Nutrition Education",
            days: ["Sunday"],
            time: "Anytime",
            completed: false,
            programId: program.id,
          },
        ];
        break;
      default:
        break;
    }

    setActivities((prev) => [...prev, ...newActivities]);

    // Show success notification
    alert(`${program.title} activities have been added to your planner!`);
  };

  const calculateCompletionRate = (activitiesList) => {
    const totalActivities = activitiesList.length;
    const completedActivities = activitiesList.filter(
      (a) => a.completed
    ).length;
    const rate =
      totalActivities > 0
        ? Math.round((completedActivities / totalActivities) * 100)
        : 0;
    setCompletionRate(rate);
  };

  const toggleActivityCompletion = (activityId) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        return { ...activity, completed: !activity.completed };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const addNewActivity = () => {
    const newActivity = {
      id: Date.now(),
      name: "New Activity",
      days: [],
      time: "Morning",
      completed: false,
      programId: null,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const removeActivity = (activityId) => {
    setActivities((prev) => prev.filter((a) => a.id !== activityId));
  };

  const getCurrentWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to Monday

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const currentWeekDates = getCurrentWeekDates();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Weekly Planner</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Completion:</span>
            <span className="text-lg font-semibold text-blue-600">
              {completionRate}%
            </span>
          </div>
        </div>

        {/* Weekly Overview */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Weekly Overview
          </h2>
          <p className="text-gray-600 mb-6">
            Your progress for this week:{" "}
            <span className="font-semibold text-blue-600">
              {completionRate}% completed
            </span>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {weekDays.map((day, index) => (
                    <th
                      key={day}
                      className="px-2 py-3 text-center text-sm font-medium text-gray-500"
                    >
                      <div>{day}</div>
                      <div className="text-xs text-gray-400">
                        {formatDate(currentWeekDates[index])}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weekDays.map((day) => {
                    const dayActivities = activities.filter((a) =>
                      a.days.includes(day)
                    );
                    const completedCount = dayActivities.filter(
                      (a) => a.completed
                    ).length;

                    return (
                      <td
                        key={day}
                        className="px-2 py-4 border-t border-gray-200"
                      >
                        <div className="h-24 flex flex-col items-center justify-center">
                          {dayActivities.length > 0 ? (
                            <>
                              <span className="text-xs text-gray-500">
                                {completedCount}/{dayActivities.length}{" "}
                                completed
                              </span>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${
                                      (completedCount / dayActivities.length) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">
                              No activities
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Planner */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Planner
            </h2>
            <button
              onClick={addNewActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-200"
            >
              Add Activity
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Activity
                  </th>
                  {weekDays.map((day) => (
                    <th
                      key={day}
                      className="px-2 py-3 text-center text-sm font-medium text-gray-500"
                    >
                      {day.substring(0, 3)}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activity.completed}
                          onChange={() => toggleActivityCompletion(activity.id)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span
                          className={`ml-3 ${
                            activity.completed
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {activity.name}
                        </span>
                      </div>
                    </td>
                    {weekDays.map((day) => (
                      <td
                        key={`${activity.id}-${day}`}
                        className="px-2 py-4 text-center"
                      >
                        <input
                          type="checkbox"
                          checked={activity.days.includes(day)}
                          onChange={() => {
                            const updatedActivities = activities.map((a) => {
                              if (a.id === activity.id) {
                                const newDays = a.days.includes(day)
                                  ? a.days.filter((d) => d !== day)
                                  : [...a.days, day];
                                return { ...a, days: newDays };
                              }
                              return a;
                            });
                            setActivities(updatedActivities);
                          }}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-4 text-gray-600">{activity.time}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => removeActivity(activity.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {activities.length} activities planned
          </div>
        </section>

        {/* Daily Activities */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Today's Activities
          </h2>

          <div className="space-y-3">
            {activities
              .filter((activity) =>
                activity.days.includes(weekDays[currentDate.getDay() - 1])
              )
              .map((activity) => (
                <div
                  key={`today-${activity.id}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => toggleActivityCompletion(activity.id)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <div className="ml-3 flex-grow">
                    <h3
                      className={`text-gray-800 ${
                        activity.completed ? "line-through" : ""
                      }`}
                    >
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  {activity.programId && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Program
                    </span>
                  )}
                </div>
              ))}

            {activities.filter((a) =>
              a.days.includes(weekDays[currentDate.getDay() - 1])
            ).length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No activities scheduled for today
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};
