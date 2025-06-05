import { HEADERS } from "@/utils/get-headers";
import { useEffect, useState } from "react";

export const useHrmDashboard = () => {
    const [dashboardData, setDashboardData] = useState<{
      departments: {
        department_name: string;
        employee_count: number;
      }[];
      designations: {
        designation_name: string;
        employee_count: number;
      }[];
      attendance: {
        date: string;
        present_count: number;
        absent_count: number;
      }[];
    } | null>(null);

    const apiUrl = `${window.zettaSettingsData.api_url}`;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}hrm/dashboard`, {
            method: 'GET',
            headers: HEADERS,
            credentials: 'include'
          });
          const data = await response.json();
          setDashboardData(data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };
      fetchData();
    }, []);



    // console.log(
    // 	'Dates:',
    // 	dashboardData.attendance.map(att => att.date),
    // 	'Present Count:',
    // 	dashboardData.attendance.map(att => att.present_count),
    // 	'Absent Count:',
    // 	dashboardData.attendance.map(att => att.absent_count)
    // );

    // 1️⃣ Employees Per Department Chart
    const departmentChartData = {
      labels: dashboardData?.departments.map(dep => dep.department_name),
      datasets: [
        {
          label: 'Employees per Department',
          data: dashboardData?.departments.map(
            dep => dep.employee_count
          ),
          backgroundColor: [
            '#0ea5e9', // Tailwind `sky-500`
            '#14b8a6', // Tailwind `teal-400`
            '#f43f5e', // Tailwind `rose-500`
            '#fbbf24', // Tailwind `amber-400`
            '#6366f1' // Tailwind `indigo-500`
          ]
        }
      ]
    };

    // 2️⃣ Employees Per Designation Chart
    const designationChartData = {
      labels: dashboardData?.designations.map(
        des => des.designation_name
      ),
      datasets: [
        {
          label: 'Employees per Designation',
          data: dashboardData?.designations.map(
            des => des.employee_count
          ),
          backgroundColor: [
            '#fbbf24', // Tailwind `amber-400`
            '#0ea5e9', // Tailwind `sky-500`
            '#f43f5e', // Tailwind `rose-500`
            '#14b8a6', // Tailwind `teal-400`
            '#6366f1' // Tailwind `indigo-500`
          ]
        }
      ]
    };

    // 3️⃣ Attendance Summary Chart
    const attendanceChartData = {
      labels: dashboardData?.attendance.map(att => att.date),
      datasets: [
        {
          label: 'Present Employees',
          data: dashboardData?.attendance.map(att => att.present_count),
          backgroundColor: '#0ea5e9' // Tailwind `sky-500`
        },
        {
          label: 'Absent Employees',
          data: dashboardData?.attendance.map(att => att.absent_count),
          backgroundColor: '#f43f5e' // Tailwind `rose-500`
        }
      ]
  };

  return {
    departmentChartData,
    dashboardData,
    designationChartData,
    attendanceChartData
  }
}