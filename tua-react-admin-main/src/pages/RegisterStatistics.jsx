import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Chart from 'react-apexcharts'
// import StyledColumnChart from "./chart-template/ColumnChart";
import { DateFilter } from "../services/filter/DateFilter";
import { GroupBy, GroupByFilter } from "../services/filter/GroupByFilter";
import moment from "moment";
import { statisticsService } from "../services/statisticsService";
import { listOfDateRange, listOfMonthRange } from "../utils/dateTimeRangeList";

const RevenueStatistics = () => {
  const cur = new Date();
  const themeReducer = useSelector(state => state.ThemeReducer.mode)
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;
  const [groupBy, setGroupBy] = useState(GroupBy.DAY_FILTER);
  const [startDate, setStartDate] = useState(
    new Date(cur - ONE_DAY_MILISECOND * 29)
  );
  const [endDate, setEndDate] = useState(cur);
  const address_ids = [1, 6];

  const [categories, setCategories] = useState(
    listOfDateRange(startDate, endDate)
  );
  const [payload, setPayload] = useState([]);
  const [payload1, setPayload1] = useState([]);

  const returnFilterType = (filterType) => {
    setGroupBy(filterType);
  };

  const returnStartDate = (startDate) => {
    setStartDate(startDate);
  };
  const returnEndDate = (endDate) => {
    setEndDate(endDate);
  };
  const listData = [];
  const title = "Báo cáo thống kê doanh thu";


  useEffect(() => {
    // for (var index = 0; index < address_ids.length; index++) {

    // }
    if (groupBy === GroupBy.DAY_FILTER) {

      statisticsService
        .registerByDay(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
          1
        )
        .then((response) => {
          setCategories(listOfDateRange(startDate, endDate));
          setPayload([{ name: "Standard", data: response.data.data[0] }, { name: "Yoga", data: response.data.data[1] }, { name: "Kickfit-MMA", data: response.data.data[2] }]);
          console.log(response.data);

        })
        .catch((e) => console.log(e));

      statisticsService
        .registerByDay(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
          2
        )
        .then((response) => {
          setCategories(listOfDateRange(startDate, endDate));
          setPayload1([{ name: "Standard", data: response.data.data[0] }, { name: "Yoga", data: response.data.data[1] }, { name: "Kickfit-MMA", data: response.data.data[2] }]);
          console.log(response.data);

        })
        .catch((e) => console.log(e));
    } else if (groupBy === GroupBy.MONTH_FILTER) {
      statisticsService
        .registerByMonth(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
          1
        )
        .then((response) => {
          setCategories(listOfMonthRange(startDate, endDate));
          setPayload([{ name: "Standard", data: response.data.data[0] }, { name: "Yoga", data: response.data.data[1] }, { name: "Kickfit-MMA", data: response.data.data[2] }]);
          console.log(response.data.data[0]);
        })
        .catch((e) => console.log());

      statisticsService
        .registerByMonth(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
          2
        )
        .then((response) => {
          setCategories(listOfMonthRange(startDate, endDate));
          setPayload1([{ name: "Standard", data: response.data.data[0] }, { name: "Yoga", data: response.data.data[1] }, { name: "Kickfit-MMA", data: response.data.data[2] }]);
          console.log(response.data.data[0]);
        })
        .catch((e) => console.log());
    }
  }, [startDate, endDate, groupBy]);


  const chartOptions = {
    // series: [{
    //     name: 'Online Customers',
    //     data: payload
    // }],
    options: {
      color: ['#6ab04c', '#2980b9', '#F9F9F9'],
      chart: {
        background: 'transparent'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: categories
      },
      legend: {
        position: 'top'
      },
      grid: {
        show: false
      }
    }
  }

  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%", }}
        variant='h3'
        id='tableTitle'
        component='div'
      >
        Số lượng đăng ký
      </Typography>
      <Box
        fullWidth
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ mr: "40px" }}>
          <DateFilter
            returnStartDate={returnStartDate}
            returnEndDate={returnEndDate}
          />
        </Box>
        <Box>
          <GroupByFilter returnFilterType={returnFilterType} />
        </Box>
      </Box>
      <Box>
      <Typography
          sx={{ flex: "1 1 100%", }}
          variant='h5'
          id='tableTitle'
          component='div'
        >
          Time City Megamall
        </Typography>
        <Chart
          options={themeReducer === 'theme-mode-dark' ? {
            ...chartOptions.options,
            theme: { mode: 'dark' }
          } : {
            ...chartOptions.options,
            theme: { mode: 'light' }
          }}
          series={payload}
          type='line'
          height='100%'
        />
      </Box>
      <Box>
      <Typography
          sx={{ flex: "1 1 100%", }}
          variant='h5'
          id='tableTitle'
          component='div'
        >
          Tầng 2, Capital Building
        </Typography>
        <Chart
          options={themeReducer === 'theme-mode-dark' ? {
            ...chartOptions.options,
            theme: { mode: 'dark' }
          } : {
            ...chartOptions.options,
            theme: { mode: 'light' }
          }}
          series={payload1}
          type='line'
          height='100%'
        />
      </Box>
      {/* {payload[0].data} */}
      {/* {payload[0].name} */}
    </>
  );
};

export default RevenueStatistics;
