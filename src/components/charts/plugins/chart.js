import { Chart, Legend, Title, Tooltip, SubTitle } from "chart.js";

Chart.register(Legend, Title, Tooltip, SubTitle);

Chart.defaults.plugins.title.display = true;
