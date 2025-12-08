import type {VariantOverrides as NotistackVariantOverrides} from "notistack";

declare module "notistack" {
    interface VariantOverrides extends NotistackVariantOverrides {
        alert: {
            data: AppAlertInterface
        };
    }
}