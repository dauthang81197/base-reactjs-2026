import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium border',
  {
    variants: {
      variant: {
        solid:   '',
        subtle:  '',
        outline: 'bg-transparent',
      },
      color: {
        brand:   '',
        success: '',
        warning: '',
        danger:  '',
        info:    '',
        neutral: '',
        coral:   '',
        purple:  '',
        cyan:    '',
      },
      size: {
        sm: 'px-2   py-0.5 text-label-sm',
        md: 'px-2.5 py-0.5 text-label-md',
        lg: 'px-3   py-1   text-label-lg',
      },
    },
    compoundVariants: [
      // ── solid ──────────────────────────────────────────────
      { variant:'solid', color:'brand',   className:'bg-brand-primary  border-brand-primary  text-white' },
      { variant:'solid', color:'success', className:'bg-success        border-success        text-white' },
      { variant:'solid', color:'warning', className:'bg-warning        border-warning        text-white' },
      { variant:'solid', color:'danger',  className:'bg-danger         border-danger         text-white' },
      { variant:'solid', color:'info',    className:'bg-info           border-info           text-white' },
      { variant:'solid', color:'neutral', className:'bg-neutral-700    border-neutral-700    text-white' },
      { variant:'solid', color:'coral',   className:'bg-support-coral  border-support-coral  text-white' },
      { variant:'solid', color:'purple',  className:'bg-support-purple border-support-purple text-white' },
      { variant:'solid', color:'cyan',    className:'bg-support-cyan   border-support-cyan   text-neutral-900' },
      // ── subtle ─────────────────────────────────────────────
      { variant:'subtle', color:'brand',   className:'bg-neutral-100 border-transparent text-brand-primary' },
      { variant:'subtle', color:'success', className:'bg-success-bg  border-transparent text-success-text' },
      { variant:'subtle', color:'warning', className:'bg-warning-bg  border-transparent text-warning-text' },
      { variant:'subtle', color:'danger',  className:'bg-danger-bg   border-transparent text-danger-text'  },
      { variant:'subtle', color:'info',    className:'bg-info-bg     border-transparent text-info-text'    },
      { variant:'subtle', color:'neutral', className:'bg-neutral-100 border-transparent text-neutral-700'  },
      { variant:'subtle', color:'coral',   className:'bg-support-peach border-transparent text-support-coral' },
      { variant:'subtle', color:'purple',  className:'bg-neutral-100 border-transparent text-support-purple' },
      { variant:'subtle', color:'cyan',    className:'bg-neutral-100 border-transparent text-support-cyan'   },
      // ── outline ────────────────────────────────────────────
      { variant:'outline', color:'brand',   className:'border-brand-primary  text-brand-primary'  },
      { variant:'outline', color:'success', className:'border-success-border text-success-text'  },
      { variant:'outline', color:'warning', className:'border-warning-border text-warning-text'  },
      { variant:'outline', color:'danger',  className:'border-danger-border  text-danger-text'   },
      { variant:'outline', color:'info',    className:'border-info-border    text-info-text'      },
      { variant:'outline', color:'neutral', className:'border-neutral-300    text-neutral-700'    },
      { variant:'outline', color:'coral',   className:'border-support-coral  text-support-coral'  },
      { variant:'outline', color:'purple',  className:'border-support-purple text-support-purple' },
      { variant:'outline', color:'cyan',    className:'border-support-cyan   text-support-cyan'   },
    ],
    defaultVariants: { variant: 'subtle', color: 'neutral', size: 'md' },
  }
);

