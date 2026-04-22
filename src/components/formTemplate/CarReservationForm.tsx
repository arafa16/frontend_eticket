import Button from "../../base-components/Button";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";

const CarReservationForm = (props: any) => {
  const {
    user_uuid,
    set_user_uuid,
    start_location,
    set_start_location,
    finish_location,
    set_finish_location,
    description,
    set_description,
    start_date,
    set_start_date,
    end_date,
    set_end_date,
    driver_uuid,
    vehicle_allocation_uuid,
    set_vehicle_allocation_uuid,
    set_driver_uuid,
    car_uuid,
    set_car_uuid,
    cars,
    cancel,
    submit,
    users,
    vehicle_allocations,
    drivers,
    is_disabled,
    is_hide,
    isLoading,
  } = props;

  return (
    <div className="w-full box p-8">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 ">
          <div>
            <div className="font-medium whitespace-nowrap">Name</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <TomSelect
                value={user_uuid}
                onChange={set_user_uuid}
                options={{
                  placeholder: "Select user",
                }}
                className="w-full"
                disabled={is_disabled}
              >
                {users?.map((data: any, index: any) => (
                  <option key={index} value={data.uuid}>
                    {data.name}
                  </option>
                ))}
              </TomSelect>
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">
              Lokasi penjemputan
            </div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="start_location"
                type="text"
                placeholder=""
                name="start_location"
                value={start_location}
                onChange={(e: any) => set_start_location(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Lokasi tujuan</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="finish_location"
                type="text"
                placeholder=""
                name="finish_location"
                value={finish_location}
                onChange={(e: any) => set_finish_location(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">
              Description/Keperluan
            </div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormTextarea
                formTextareaSize="sm"
                id="description"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e: any) => set_description(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Tanggal Mulai</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="start_date"
                type="datetime-local"
                placeholder=""
                name="start_date"
                value={start_date}
                onChange={(e: any) => set_start_date(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Tanggal Mulai</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="end_date"
                type="datetime-local"
                placeholder=""
                name="end_date"
                value={end_date}
                onChange={(e: any) => set_end_date(e.target.value)}
              />
            </div>
          </div>
          <div className={`${is_hide ? "hidden" : ""}`}>
            <div className="font-medium whitespace-nowrap">
              Alokasi Kendaraan
            </div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <TomSelect
                value={vehicle_allocation_uuid}
                onChange={set_vehicle_allocation_uuid}
                options={{
                  placeholder: "",
                }}
                className="w-full"
              >
                {vehicle_allocations?.map((data: any, index: any) => (
                  <option key={index} value={data.uuid}>
                    {data.name}
                  </option>
                ))}
              </TomSelect>
            </div>
          </div>
          <div className={`${is_hide ? "hidden" : ""}`}>
            <div className="font-medium whitespace-nowrap">Driver</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <TomSelect
                value={driver_uuid}
                onChange={set_driver_uuid}
                options={{
                  placeholder: "Select your favorite actors",
                }}
                className={`w-full`}
                disabled={is_disabled}
              >
                {drivers &&
                  drivers.map((data: any, index: any) => (
                    <option key={index} value={data.uuid}>
                      {data.name}
                    </option>
                  ))}
              </TomSelect>
            </div>
          </div>
          <div className={`${is_hide ? "hidden" : ""}`}>
            <div className="font-medium whitespace-nowrap">Mobil</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormSelect
                formSelectSize="sm"
                aria-label=".form-select-sm example"
                name="car_uuid"
                value={car_uuid}
                onChange={(e: any) => set_car_uuid(e.target.value)}
              >
                <option value={""}></option>
                {cars?.map((data: any, index: any) => (
                  <option key={index} value={data.uuid}>
                    {data.name}
                  </option>
                ))}
              </FormSelect>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-x-4">
          <Button
            size="xs"
            variant="secondary"
            type="submit"
            className="px-8"
            onClick={() => cancel()}
          >
            Cancel
          </Button>
          <Button size="xs" variant="primary" type="submit" className="px-8">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarReservationForm;
