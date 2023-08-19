import { Address } from "ton-core";

export type Nft = {
    address: string,
    approved_by: null,
    collection: {
        address: string,
        name: string
    },
    index: number,
    metadata: {
        name: string,
        description: string,
        marketplace: string,
        attributes: { "trait_type": string, "value": string }[],
        image: string
    },
    owner: {
        address: string,
        icon: string,
        is_scam: false,
        name: string, // domain
    },
    verified: true
}

export type Txn = {
    hash: string,
    lt: number,
    account: {
        address: Address,
        is_scam: boolean
    },
    success: boolean,
    utime: number,
    orig_status: string,
    end_status: string,
    total_fees: number,
    transaction_type: string,
    state_update_old: string,
    state_update_new: string,
    in_msg: {
        created_lt: number,
        ihr_disabled: boolean,
        bounce: boolean,
        bounced: boolean,
        value: number,
        fwd_fee: number,
        ihr_fee: number,
        destination?: {
            address: Address,
            is_scam: boolean
        },
        source?: {
            address: Address,
            is_scam: boolean
        },
        import_fee: number,
        created_at: number,
        decoded_body?: {
            text?: string,
            query_id?: number,
            prev_owner?: string,
            forward_payload?: any
        }
    },
    out_msgs: [],
    block: string,
    prev_trans_hash: string,
    prev_trans_lt: number,
    compute_phase: {
        skipped: boolean,
        success: boolean,
        gas_fees: number,
        gas_used: number,
        vm_steps: number,
        exit_code: number
    },
    storage_phase: { fees_collected: number, status_change: string },
    action_phase: {
        success: boolean,
        total_actions: number,
        skipped_actions: number,
        fwd_fees: number,
        total_fees: number
    },
    aborted: boolean,
    destroyed: boolean
}
