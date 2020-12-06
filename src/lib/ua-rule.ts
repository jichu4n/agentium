/** Describes how to conditionally apply a particular user agent identity. */
export interface UaRule {
  id: string;
  /** Describes when to apply this rule. */
  condition: UaRuleCondition;
  /** Describes the action to take when the condition matches. */
  action: UaRuleAction;
  /** Whether this rule should be synced across devices */
  shouldSync: boolean;
}

/** Type of UaRuleCondition. */
export enum UaRuleConditionType {
  /** UaRuleCondition based on a URL's domain. */
  DOMAIN = 'domain',
}

/** UaRuleCondition based on a URL's domain. */
interface DomainCondition {
  type: UaRuleConditionType.DOMAIN;

  /** The domain name to match. */
  domain: string;
  /** Whether subdomains of the specified domain should match. */
  shouldMatchSubdomains: boolean;
}

/** Describes a condition for applying a particular user agent identity. */
export type UaRuleCondition = DomainCondition;

/** Type of a UaRuleAction. */
export enum UaRuleActionType {
  USE_DEFAULT_UA = 'useDefaultUa',
  USE_SPECIFIC_UA = 'useSpecificUa',
}

/** UaRuleAction for applying the browser's default user agent identity. */
interface UseDefaultUaAction {
  type: UaRuleActionType.USE_DEFAULT_UA;
}

/** UaRuleAction for applying a specific user agent identity. */
interface UseSpecificUaAction {
  type: UaRuleActionType.USE_SPECIFIC_UA;
  /** ID of the UaSpec to apply. */
  uaSpecId: string;
}

/** Describes what action to take when a UaRuleCondition matches. */
export type UaRuleAction = UseDefaultUaAction | UseSpecificUaAction;

/** The context against which UaRuleCondition is matched. */
export interface UaRuleConditionContext {
  /** URL of the page into which the requested resource will be loaded. */
  documentUrl: string;
}

/** Checks if a UaRuleCondition matches. */
export function matchesUaRuleCondition(
  context: UaRuleConditionContext,
  condition: UaRuleCondition
) {
  switch (condition.type) {
    case UaRuleConditionType.DOMAIN:
      const contextDomain = new URL(context.documentUrl).hostname.toLowerCase();
      const conditionDomain = condition.domain.toLowerCase().trim();
      return (
        contextDomain === conditionDomain ||
        (condition.shouldMatchSubdomains &&
          contextDomain.endsWith(`.${conditionDomain}`))
      );
    default:
      throw new Error(`Unexpected condition type: ${condition.type}`);
  }
}
