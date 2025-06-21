export type searchParams = {
  size: string;
  withErrors: string;
  maxSpend: string;
};

const fetchReport = async ({
  success,
  failed,
  searchParams,
}: {
  success: () => void;
  failed: () => void;
  searchParams: searchParams;
}) => {
  const params = new URLSearchParams(searchParams);

  const url = `http://localhost:3000/report?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }

    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'report.csv';
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(link);
    success();
  } catch (e) {
    console.error('Ошибка при загрузке файла:', e);
    failed();
  }
};

export default fetchReport;
