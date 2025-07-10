import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlans } from "@/store/company-service/payment-servce/plan-get";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import { fetchCompanyByOwnerId } from "@/storePrincipal";
import { createPayment, clearPaymentStatus } from "@/store/company-service/payment-servce/payment-create-id";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../../../public/animation/errorData.json";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPaymentsByCompany } from "@/store/company-service/payment-servce/payment-hstory-get";
import './method.css';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PaymentsMethod = () => {
  const dispatch = useDispatch();

  const { dataPlan, loadingPlan, errorPlan } = useSelector((state) => state.plans);
  const { data: companyData } = useSelector((state) => state.companyByOwner);
  const { data: userData } = useSelector((state) => state.companyProfileGet);
  const { success, error } = useSelector((state) => state.payment);
  const { data: paymentsData, loading: paymentsLoading, error: paymentsError } = useSelector((state) => state.paymentsByCompany);

  // 1. Fetch user profile
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // 2. Fetch company based on user id
  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchCompanyByOwnerId(userData.id));
    }
  }, [userData, dispatch]);

  // 3. Fetch company payments
  useEffect(() => {
    if (companyData?.id) {
      console.log("✅ companyId:", companyData.id);
      dispatch(fetchPayment);
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const res = await axios.get('https://api.onemeet.app/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'companyProfileGet',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

export const fetchCompanyByOwnerId = createAsyncThunk(
  'company/fetchByOwnerId',
  async (ownerUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await axios.get(`https://api.onemeet.app/company/get-by-ownerUserId/${ownerUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const companyByOwnerSlice = createSlice({
  name: 'companyByOwner',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyByOwnerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyByOwnerId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyByOwnerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching company data';
      });
  },
});

export default companyByOwnerSlice.reducer;

export const fetchAllPlans = createAsyncThunk(
  'plans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await axios.get('https://api.onemeet.app/plan/get-all-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    dataPlan: [],
    loadingPlan: false,
    errorPlan: null,
  },
  reducers: {
    clearPlans: (state) => {
      state.dataPlan = [];
      state.loadingPlan = false;
      state.errorPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlans.pending, (state) => {
        state.loadingPlan = true;
        state.errorPlan = null;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.loadingPlan = false;
        state.dataPlan = action.payload;
      })
      .addCase(fetchAllPlans.rejected, (state, action) => {
        state.loadingPlan = false;
        state.errorPlan = action.payload || 'Error fetching plans';
      });
  },
});

export const { clearPlans } = plansSlice.actions;
export default plansSlice.reducer;

export const createPayment = createAsyncThunk(
  'payment/create',
  async ({ companyId, planId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const res = await axios.post(
        `https://api.onemeet.app/payment/create/${companyId}/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error('Payment creation error:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearPaymentStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Payment failed';
      });
  },
});

export const { clearPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;

export const fetchPaymentsByCompany = createAsyncThunk(
  'payments/fetchByCompany',
  async (companyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await axios.get(
        `https://api.onemeet.app/payment/get-company-id/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const paymentsByCompanySlice = createSlice({
  name: 'paymentsByCompany',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentsByCompany: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentsByCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPaymentsByCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching payments by company';
      });
  },
});

export const { clearPaymentsByCompany } = paymentsByCompanySlice.actions;
export default paymentsByCompanySlice.reducer;

const PaymentsMethod = () => {
  const dispatch = useDispatch();

  const { dataPlan, loadingPlan, errorPlan } = useSelector((state) => state.plans);
  const { data: companyData } = useSelector((state) => state.companyByOwner);
  const { data: userData } = useSelector((state) => state.companyProfileGet);
  const { success, error } = useSelector((state) => state.payment);
  const { data: paymentsData, loading: paymentsLoading, error: paymentsError } = useSelector((state) => state.paymentsByCompany);

  console.log(companyData, "company");
  console.log(dataPlan, "plan");
  console.log(userData, "user");
  console.log(paymentsData, "payments");

  // 1. Fetch user profile
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // 2. Fetch company based on user id
  useEffect(() => {
    if (userData?.id) {
      console.log("✅ userId:", userData.id);
      dispatch(fetchCompanyByOwnerId(userData.id));
    }
  }, [userData, dispatch]);

  // 3. Fetch company payments
  useEffect(() => {
    if (companyData?.id) {
      console.log("✅ companyId:", companyData.id);
      dispatch(fetchPaymentsByCompany(companyData.id));
    }
  }, [companyData, dispatch]);

  // 4. Fetch all plans
  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  // 5. Payment result handler
  useEffect(() => {
    if (success) {
      toast.success("Payment successfully created!");
      dispatch(clearPaymentStatus());
    }
    if (error) {
      toast.error(`Payment failed: ${error}`);
      dispatch(clearPaymentStatus());
    }
  }, [success, error, dispatch]);

  const handlePayment = (planId) => {
    const companyId = companyData?.id;

    if (!companyId || !planId) {
      toast.error("Company yoki Plan ID mavjud emas");
      return;
    }

    console.log("Initiating payment for:", { companyId, planId });
    dispatch(createPayment({ companyId, planId }))
      .unwrap()
      .then((res) => {
        if (res && res.sessionUrl) {
          console.log("✅ Payment response:", res);
          window.location.href = res.sessionUrl; // Stripe redirect
        } else {
          toast.success("To'lov yaratildi, ammo session yo'q");
        }
      })
      .catch((err) => {
        toast.error(`To‘lovda xatolik: ${err}`);
      });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading)
    return (
      <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white translate-y-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[25px] w-full rounded-xl" />
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white w-full grid place-content-center">
        <Lottie animationData={animationData} loop autoplay style={{ height: "400px", width: "380px" }} />
      </div>
    );

  return (
    <div className="shadow-md rounded-md mb-10 bg-white translate-y-5">
      <p className="text-[19px] font-bold text-black border-l-[4px] border-[#2b43d4] p-4 rounded-tl-md bg-[#f4f5fd]">
        Payment History
      </p>
      <div className="">
        <Table>
          <TableHeader className=" text-black hover:bg-transparent focus:ring-0 border-l-[4px] border-[#2b43d4] bg-[#f4f5fd]">
            <TableRow className="hover:bg-transparent focus:ring-0 focus:outline-none border-none shadow-none p-4">
              <TableHead className="text-white translate-x-2">Name</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Credits</TableHead>
              <TableHead className="text-white">Currency</TableHead>
              <TableHead className="ps-10.5 text-white">Created At</TableHead>
              <TableHead className="text-white">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium translate-x-2">
                  {item?.plan?.name}
                </TableCell>
                <TableCell>{item?.plan?.amount}</TableCell>
                <TableCell>{item?.plan?.credits}</TableCell>
                <TableCell>{item?.plan?.currency}</TableCell>
                <TableCell>
                  {item?.createdAt ? (
                    <>
                      <span>{item.createdAt.slice(0, 10).replace(/-/g, ".")}</span>
                      <span className="text-gray-500 px-2 py-1 rounded mx-3">
                        {item.createdAt.slice(11, 16)}
                      </span>
                    </>
                  ) : (
                    "No date"
                  )}
                </TableCell>
                <TableCell
                  className={`ps-10 font-medium ${
                    item?.paymentStatus === "SUCCESS"
                      ? "text-green-600"
                      : item?.paymentStatus === "PENDING"
                      ? "text-yellow-500"
                      : item?.paymentStatus === "FAILED"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {item?.paymentStatus || "Unknown"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end gap-2 py-4 pr-4">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-sm ${
                  currentPage === page
                    ? "border border-gray-300 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
